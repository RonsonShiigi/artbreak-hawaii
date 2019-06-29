import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import TypingIndicator from "./components/TypingIndicator";
import WhosOnlineList from "./components/WhosOnlineList";
import RoomList from "./components/RoomList";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
      joinableRooms: [],
      joinedRooms: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
  }

  sendTypingEvent() {
    this.state.currentUser.isTypingIn({ roomId: this.state.currentRoom.id });
    // .catch(error => console.error("error", error));
    this.forceUpdate(this.getRooms());
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
    this.forceUpdate(this.getRooms());
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState(
          {
            joinableRooms,
            joinedRooms: this.currentUser.rooms
          },
          () => {
            localStorage.setItem(
              "joinedRooms",
              JSON.stringify(this.state.joinedRooms)
            );
          }
        );
        console.log(">>>>>>", joinableRooms);
      })
      .catch(err => console.log("error on joinableRooms: ", err));
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.setState({ roomId: roomId });

    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        messageLimit: 100,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          },
          onUserStartedTyping: user => {
            this.setState({
              usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
            });
          },
          onUserStoppedTyping: user => {
            this.setState({
              usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                username => username !== user.name
              )
            });
          },
          onPresenceChange: () => this.forceUpdate(),
          onUserJoined: () => this.forceUpdate()
        }
      })
      .then(currentRoom => {
        this.setState({ currentRoom });
      })
      .catch(err => console.log("error on subscribing to room: ", err));
    this.forceUpdate(this.getRooms());
  }

  componentDidMount() {
    const localUsername = localStorage.getItem("username");
    fetch("http://35.167.36.255:8080/chatusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: localUsername })
    }).then(response => {
      console.log("res>>>", response);
      const chatManager = new Chatkit.ChatManager({
        instanceLocator: "v1:us1:d6baf088-e188-43f2-8140-5d6388842598",
        userId: localStorage.getItem("username"),
        tokenProvider: new Chatkit.TokenProvider({
          url: "http://35.167.36.255:8080/authenticate"
        })
      });

      chatManager
        .connect()
        .then(currentUser => {
          this.currentUser = currentUser;
          this.setState({ currentUser: currentUser });
          this.getRooms();
          // Auto join the General chat room when user clicks on My Messages
          this.subscribeToRoom("19451739");
        })
        .catch(err => console.log("error on connecting: ", err));
    });
  }

  render() {
    console.log(this.state.joinedRooms.length);
    // console.log("curr user", this.state);
    // console.log("this.props", this.props);
    const styles = {
      container: {
        height: "85vh",
        width: "120vw",
        marginTop: "105px",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
        background: "white",
        overflow: "auto"
      },
      chatContainer: {
        display: "flex",
        flex: 1,
        overflow: "auto"
      },
      whosOnlineListContainer: {
        width: "15%",
        paddingTop: 40,
        paddingLeft: 10,
        backgroundColor: "#252525",
        color: "white",
        flexDirection: "column"
      },
      chatListContainer: {
        paddingTop: 40,
        paddingLeft: 15,
        display: "flex",
        height: "auto",
        flexDirection: "column",
        background: "white",
        flexWrap: "columnWrap",
        width: "81vw"
      },
      li: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "columnWrap"
      }
    };

    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <aside style={styles.whosOnlineListContainer}>
            <WhosOnlineList
              currentUser={this.state.currentUser}
              users={this.state.currentRoom.users}
              subscribeToRoom={this.subscribeToRoom}
            />
            <RoomList
              subscribeToRoom={this.subscribeToRoom}
              rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
              roomId={this.state.roomId}
            />
          </aside>
          <section style={styles.chatListContainer}>
            <MessageList
              roomId={this.state.roomId}
              messages={this.state.messages}
              style={styles.chatList}
            />
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default ChatScreen;
