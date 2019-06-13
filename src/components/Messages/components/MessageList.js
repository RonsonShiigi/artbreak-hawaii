import React, { Component } from "react";

class MessagesList extends Component {
  render() {
    const styles = {
      container: {
        overflow: "scroll",
        width: "80vw"
      },
      ul: {
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
      },
      li: {
        marginTop: 2,
        marginBottom: 2
      },
      senderUsername: {
        fontWeight: "bold"
      },
      message: { fontSize: 15 }
    };
    return (
      <div
        style={{
          ...this.props.style,
          ...styles.container
        }}
      >
        <ul style={styles.ul}>
          {this.props.messages.map((message, index) => (
            <li key={index} style={styles.li}>
              <div>
                <span style={styles.senderUsername}>{message.senderId}</span>{" "}
              </div>
              <p style={styles.message}>{message.text}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MessagesList;
