import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fireRedirect: false,
      verifyEmailPw: true,
      pwReset: null,
      resetSuccess: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.location.pwReset) {
      this.setState({ pwReset: true });
    }

    if (this.props.location.resetSuccess) {
      this.setState({ resetSuccess: true });
    }
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const emailLowercase = this.state.email.toLowerCase();

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: this.state.password,
        email: emailLowercase
      })
    })
      .then(res => {
        if (res.status === 401) {
          this.setState({ verifyEmailPw: false });
        } else {
          const data = res.clone().json();
          console.log("RES", data);
          return data;
        }
      })
      .then(data => {
        console.log("DATA", data);
        if (!data) {
        } else {
          localStorage.setItem("userEmail", this.state.email);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("username", data.username);
          localStorage.setItem("username", data.username);
          localStorage.setItem("userId", data.id);
          window.location.replace("http://localhost:8081");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { verifyEmailPw, resetSuccess, pwReset } = this.state;

    function EmailPWError(props) {
      return <div className="error-div">User Email or Password not found!</div>;
    }

    function EmailPWExists(props) {
      const isVerified = props.eExists;

      if (!isVerified) {
        return <EmailPWError />;
      } else {
        return null;
      }
    }

    function ResetPWMessage(props) {
      return (
        <div className="error-div">
          A link has been sent the provided email address to reset your password
        </div>
      );
    }

    function ResetPassword(props) {
      const checkPwReset = props.resetPassword;

      if (checkPwReset) {
        return <ResetPWMessage />;
      } else {
        return null;
      }
    }

    function ResetSuccessMsg() {
      return (
        <div className="error-div">Password has been successfully changed</div>
      );
    }

    function ResetSuccess(props) {
      const resetSuccess = props.isSuccess;

      if (resetSuccess) {
        return <ResetSuccessMsg />;
      } else {
        return null;
      }
    }

    return (
      <div className="container">
        <div className="form-holder">
          <h1 className="form-title">Login</h1>
          <ResetPassword resetPassword={pwReset} />
          <ResetSuccess isSuccess={resetSuccess} />
          <form onSubmit={this.handleSubmit}>
            <svg
              className="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="40"
              viewBox="0 0 44 40"
            >
              <g
                stroke="#252525"
                fill="none"
                strokeWidth="3.538"
                transform="translate(0 -1012.362)"
              >
                <ellipse
                  ry="8.09"
                  rx="8.244"
                  cy="1022.221"
                  cx="21.555"
                  strokeLinecap="round"
                />
                <path d="M1.858 1046.4c-.79 4.74 3.805 4.11 3.805 4.11H37.88s4.846.936 4.312-3.854c-.533-4.79-6.076-10.937-20.04-11.043-13.964-.106-19.504 6.047-20.294 10.786z" />
              </g>
            </svg>
            <input
              type="text"
              id="email"
              label="email"
              key="email"
              name="email"
              onChange={this.handleChange("email")}
              margin="normal"
              fullwidth="true"
              variant="outlined"
              placeholder="email"
            />

            <br />
            <svg
              className="svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="44"
              height="46"
              viewBox="0 0 44 46"
            >
              <g
                transform="translate(-28.15 -974.678)"
                stroke="#252525"
                fill="none"
                strokeWidth="3.509"
              >
                <rect
                  ry="3.136"
                  y="995.18"
                  x="29.903"
                  height="23.743"
                  width="40.491"
                  strokeLinecap="round"
                />
                <path d="M49.386 1004.406v4.788" strokeLinecap="round" />
                <path d="M37.073 994.83s-1.39-18.398 12.97-18.398c14.36 0 12.207 18.397 12.207 18.397" />
              </g>
            </svg>
            <input
              id="password"
              label="password"
              type="password"
              key="password"
              name="password"
              onChange={this.handleChange("password")}
              margin="normal"
              variant="outlined"
              fullwidth="true"
            />
            <EmailPWExists eExists={verifyEmailPw} />
            <br />

            <button type="submit">Submit</button>
            <br />
            <Link to="/forgotPassword">Forgot your password?</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
