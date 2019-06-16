import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import TypingIndicator from "./components/TypingIndicator";
import WhosOnlineList from "./components/WhosOnlineList";
import RoomList from "./components/RoomList";

import { ActionViewColumn } from "material-ui/svg-icons";
import { wrap } from "module";

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
      joinableRooms: [],
      joinedRooms: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTypingEvent = this.sendTypingEvent.bind(this);
  }

  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error("error", error));
  }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    });
  }

  componentDidMount() {
    const localUsername = localStorage.getItem("username");
    fetch("http://localhost:8080/chatusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: localUsername })
    })
      .then(response => {
        const chatManager = new Chatkit.ChatManager({
          instanceLocator: "v1:us1:d6baf088-e188-43f2-8140-5d6388842598",
          userId: localStorage.getItem("username"),
          tokenProvider: new Chatkit.TokenProvider({
            url: "http://localhost:8080/authenticate"
          })
        });

        chatManager
          .connect()
          .then(currentUser => {
            this.setState({ currentUser });

            // GETTING ROOMS
            currentUser
              .getJoinableRooms()
              .then(joinedRooms => {
                this.setState({
                  joinedRooms: currentUser.rooms
                });
              })
              .catch(err => console.log("error on joinableRooms: ", err));

            // GENERAL ROOM
            return currentUser.subscribeToRoom({
              roomId: "19438031",
              messageLimit: 100,
              hooks: {
                onMessage: message => {
                  this.setState({
                    messages: [...this.state.messages, message]
                  });
                },
                onUserStartedTyping: user => {
                  this.setState({
                    usersWhoAreTyping: [
                      ...this.state.usersWhoAreTyping,
                      user.name
                    ]
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
            });
          })
          .then(currentRoom => {
            this.setState({ currentRoom });
          })
          .catch(error => console.error("error", error));
      })
      .catch(error => console.error("error", error));
    this.setState({
      currentUser: localStorage.getItem("username")
    });
  }

  render() {
    const styles = {
      container: {
        height: "88vh",
        width: "100vw",
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
        paddingTop: 50,
        paddingLeft: 10,
        backgroundColor: "#2c303b",
        color: "white",
        flexDirection: "column"
      },
      chatListContainer: {
        paddingTop: 50,
        paddingLeft: 15,
        display: "flex",
        height: "auto",
        flexDirection: "column",
        background: "white",
        flexWrap: "columnWrap"
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
            />
            <RoomList
              rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
            />
            {/* <button onClick="privateChat()">jew</button> */}
          </aside>
          <section style={styles.chatListContainer}>
            <MessageList
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
