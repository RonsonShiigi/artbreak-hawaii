import React, { Component } from "react";
import ChatScreen from "../message";

class WhosOnlineList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      currentUser: this.props.currentUser,
      clickedUser: ""
    };
  }

  createRoom() {
    // console.log(this.subscribeToRoom(this.state.roomId));
    console.log(this.props.currentUser.id);
    console.log(this.state.clickedUser);
    this.props.currentUser
      .createRoom({
        name: this.state.clickedUser,
        private: true,
        addUserIds: [this.props.currentUser.id, this.state.clickedUser]
      })
      .then(room => {
        this.setState({ roomId: room.id }, () => {
          this.props.subscribeToRoom(JSON.stringify(room.id));
        });
        console.log("yeet", this.state.roomId);
      })
      .catch(err => {
        console.log(`Error creating room ${err}`);
      });
    // console.log(this.state.roomId);
  }
  click = e => {
    var clickedUser = e.target.innerText || e.target.textContent;
    this.setState({ clickedUser: clickedUser }, () => {
      this.createRoom();
    });
    console.log(this.state.clickedUser);
  };

  renderUsers() {
    return (
      <ul onClick={this.click}>
        {this.props.users.map((user, index) => {
          if (user.id === this.props.currentUser.id) {
            return (
              <WhosOnlineListItem key={index} presenceState="online">
                {user.name} (you)
              </WhosOnlineListItem>
            );
          }
          return (
            <WhosOnlineListItem key={index} presenceState={user.presence.state}>
              {user.name}
            </WhosOnlineListItem>
          );
        })}
      </ul>
    );
  }

  render() {
    if (this.props.users) {
      return this.renderUsers();
    } else {
      return <p>Loading...</p>;
    }
  }
}

class WhosOnlineListItem extends Component {
  render() {
    const styles = {
      li: {
        display: "flex",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 2,
        paddingBottom: 2,
        cursor: "pointer"
      },
      div: {
        borderRadius: "50%",
        width: 11,
        height: 11,
        marginRight: 20
      }
    };
    return (
      <div>
        <li style={styles.li}>
          <div
            style={{
              ...styles.div,
              backgroundColor:
                this.props.presenceState === "online" ? "#4ca64c" : "#414756"
            }}
          />
          {this.props.children}
        </li>
      </div>
    );
  }
}

export default WhosOnlineList;
