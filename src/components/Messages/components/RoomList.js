import React from "react";

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: {}
    };
  }

  render() {
    const styles = {};
    // console.log(this.state.rooms);
    return (
      <div style={styles.container}>
        {/* {console.log(this.props)} */}
        <div className="rooms-list">
          <ul>
            <h3>Your Rooms:</h3>
            {this.props.rooms.map(room => {
              // console.log("props", this.props.roomId);
              // console.log("woo", room.id);
              const activeColor =
                this.props.roomId === room.id ? "#FFFFFF" : "#696969";
              const activeBold = this.props.roomId === room.id ? "bold" : "";

              return (
                <li key={room.id} className={"room"}>
                  <li>
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
