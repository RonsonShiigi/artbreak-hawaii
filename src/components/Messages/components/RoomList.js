import React from "react";

class RoomList extends React.Component {
  render() {
    const styles = {};
    return (
      <div style={styles.container}>
        <div className="rooms-list">
          <ul>
            <h3>Your Rooms:</h3>
            {this.props.rooms.map(room => {
              const activeColor =
                this.props.roomId === room.id ? "#FFFFFF" : "#B0B0B0";
              const activeBold = this.props.roomId === room.id ? "bold" : "";

              return (
                <li key={room.id} className={"room"}>
                  <a
                    href="#"
                    onClick={() => this.props.subscribeToRoom(room.id)}
                    style={{
                      color: activeColor,
                      fontWeight: activeBold
                    }}
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
