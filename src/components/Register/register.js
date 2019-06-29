import React, { Component } from "react";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      emailExist: false,
      emailValid: true,
      usernameExist: false,
      passwordValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handlePWChange = e => {
    this.setState({ passwordValid: true });
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
    if (e.target.value.length < 8 || e.target.value.length > 16) {
      this.setState({ passwordValid: false });
    }
  };

  //may need to refactor using switch statements?
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      emailExist: false,
      usernameExist: false,
      emailValid: true,
      passwordValid: true
    });
    const emailLowercase = this.state.email.toLowerCase();
    console.log("TOLOWERCASE", emailLowercase);

    fetch("http://35.167.36.255:8080/api/auth/register/check", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailLowercase,
        username: this.state.username
      })
    })
      .then(res => {
        return res.json();
      })
      .then(user => {
        if (user.email === "ERROR" && user.username !== "") {
          this.setState({ usernameExist: true, emailValid: false });
        } else if (user.email === "ERROR") {
          this.setState({ emailValid: false });
        } else if (user.email === "" && user.username === "") {
          fetch("http://35.167.36.255:8080/api/auth/register", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              password: this.state.password,
              username: this.state.username,
              email: emailLowercase
            })
          })
            .then(res => {
              window.location.replace("http://35.167.36.255:8081/login");
            })
            .catch(err => {
              console.log("FRONT END", err);
            });
        } else {
          if (user.email !== "" && user.username !== "") {
            this.setState({ emailExist: true });
            this.setState({ usernameExist: true });
          } else if (user.email !== "") {
            this.setState({ emailExist: true });
          } else if (user.username !== "") {
            this.setState({ usernameExist: true });
          }
        }
      });
  };
  render() {
    const { passwordValid } = this.state;
    function UsernameError(props) {
      return <div>Username Taken, Please use another username..</div>;
    }

    function EmailError(props) {
      return (
        <div className="error-div">
          Email already in use, Please enter another email..
        </div>
      );
    }

    function EmailInvalid(props) {
      return (
        <div className="error-div">Please provide a valid email address</div>
      );
    }
    function PasswordError(props) {
      return (
        <div className="error-div">
          Password must be between 8-16 characters
        </div>
      );
    }

    function EmailExists(props) {
      const emailExists = props.emailExists;

      if (emailExists) {
        return <EmailError />;
      } else {
        return null;
      }
    }

    function UsernameExists(props) {
      const usernameExists = props.userExists;

      if (usernameExists) {
        return <UsernameError />;
      } else {
        return null;
      }
    }

    function EmailValid(props) {
      const isValid = props.emailInvalid;
      if (!isValid) {
        return <EmailInvalid />;
      } else {
        return null;
      }
    }
    function PasswordValid(props) {
      const isValid = props.passwordInvalid;
      if (!isValid) {
        return <PasswordError />;
      } else {
        return null;
      }
    }

    function submitDisabled() {
      if (passwordValid) {
        return false;
      } else {
        return true;
      }
    }

    return (
      <div className="container">
        <div className="form-holder">
          <h1 className="form-title">Register</h1>
          <form onSubmit={this.handleSubmit}>
            <svg class="svg-icon" viewBox="0 0 20 20">
              <path d="M16.999,4.975L16.999,4.975C16.999,4.975,16.999,4.975,16.999,4.975c-0.419-0.4-0.979-0.654-1.604-0.654H4.606c-0.584,0-1.104,0.236-1.514,0.593C3.076,4.928,3.05,4.925,3.037,4.943C3.034,4.945,3.035,4.95,3.032,4.953C2.574,5.379,2.276,5.975,2.276,6.649v6.702c0,1.285,1.045,2.329,2.33,2.329h10.79c1.285,0,2.328-1.044,2.328-2.329V6.649C17.724,5.989,17.441,5.399,16.999,4.975z M15.396,5.356c0.098,0,0.183,0.035,0.273,0.055l-5.668,4.735L4.382,5.401c0.075-0.014,0.145-0.045,0.224-0.045H15.396z M16.688,13.351c0,0.712-0.581,1.294-1.293,1.294H4.606c-0.714,0-1.294-0.582-1.294-1.294V6.649c0-0.235,0.081-0.445,0.192-0.636l6.162,5.205c0.096,0.081,0.215,0.122,0.334,0.122c0.118,0,0.235-0.041,0.333-0.12l6.189-5.171c0.099,0.181,0.168,0.38,0.168,0.6V13.351z" />
            </svg>
            <input
              type="text"
              id="email"
              placeholder="email"
              key="email"
              name="email"
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
              required={true}
            />
            <EmailExists emailExists={this.state.emailExist} />
            <EmailValid emailInvalid={this.state.emailValid} />
            <svg
              class="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="40"
              viewBox="0 0 44 40"
            >
              <g
                stroke="#252525"
                fill="none"
                stroke-width="3.538"
                transform="translate(0 -1012.362)"
              >
                <ellipse
                  ry="8.09"
                  rx="8.244"
                  cy="1022.221"
                  cx="21.555"
                  stroke-linecap="round"
                />
                <path d="M1.858 1046.4c-.79 4.74 3.805 4.11 3.805 4.11H37.88s4.846.936 4.312-3.854c-.533-4.79-6.076-10.937-20.04-11.043-13.964-.106-19.504 6.047-20.294 10.786z" />
              </g>
            </svg>
            <input
              type="text"
              id="username"
              placeholder="username"
              key="username"
              name="username"
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
              required={true}
            />
            <UsernameExists userExists={this.state.usernameExist} />
            <div />
            <svg
              class="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="46"
              viewBox="0 0 44 46"
            >
              <g
                transform="translate(-28.15 -974.678)"
                stroke="#252525"
                fill="none"
                stroke-width="3.509"
              >
                <rect
                  ry="3.136"
                  y="995.18"
                  x="29.903"
                  height="23.743"
                  width="40.491"
                  stroke-linecap="round"
                />
                <path d="M49.386 1004.406v4.788" stroke-linecap="round" />
                <path d="M37.073 994.83s-1.39-18.398 12.97-18.398c14.36 0 12.207 18.397 12.207 18.397" />
              </g>
            </svg>
            <input
              id="password"
              placeholder="password"
              key="password"
              name="password"
              onChange={this.handlePWChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
              type="password"
            />
            <PasswordValid passwordInvalid={this.state.passwordValid} />

            <button
              disabled={submitDisabled()}
              type="submit"
              variant="contained"
              fullWidth={true}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
