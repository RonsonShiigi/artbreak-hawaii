import React, { Component } from "react";
import ChatScreen from "../message";

class WhosOnlineList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser
    };
  }
  createRoom() {
    this.props.currentUser
      .createRoom({
        name: "Conversation with Justen & Jew",
        private: true,
        addUserIds: ["justen", "jew"],
        customData: { foo: 42 }
      })
      .then(room => {
        console.log(`Created room called ${room.name}`);
      })
      .catch(err => {
        console.log(`Error creating room ${err}`);
      });
  }
  click = e => {
    this.createRoom();
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
        paddingBottom: 2
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
