import React, { Component } from "react";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

function Register() {
  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  return (
    <div>
      <form>
        <TextField
          id="email"
          label="email"
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
        />
      </form>
    </div>
  );
}
// class Register extends Component {
// constructor(props) {
//   super(props);
//   this.state = {
//     email: "",
//     password: ""
//   };
// }

//   render() {
//     return (
//       <div>
//         <form>
//           <TextField
//             id="email"
//             label="email"
//             value={values.email}
//             onChange={handleChange("email")}
//             margin="normal"
//           />
//         </form>
//       </div>
//     );
//   }
// }

export default Register;
