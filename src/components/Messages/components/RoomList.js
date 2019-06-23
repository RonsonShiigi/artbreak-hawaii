import React from "react";

class RoomList extends React.Component {
  render() {
    const styles = {
      room: {
        color: "#ff0000"
      }
    };
    return (
      <div style={styles.container}>
        <div className="rooms-list">
          <ul>
            <h3>Your rooms:</h3>
            {this.props.rooms.map(room => {
              return (
                <li
                  key={room.id}
                  className={"room"}
                  style={{
                    color: this.props.roomId === room.id ? "#ff0000" : "#00ff00"
                  }}
                >
                  <a
                    href="#"
                    onClick={() => this.props.subscribeToRoom(room.id)}
                  >
                    {room.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default RoomList;
