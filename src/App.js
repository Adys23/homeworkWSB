import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    email: '',
    password: '',
    isSubmitted: false,
    emailIncorrect: true,
    passwordIncorrect: true,
    emailErrorVisibility: 'hidden',
    passwordErrorVisibility: 'hidden'
  };

  handleLogin = () => {
    if (!this.state.emailIncorrect && !this.state.passwordIncorrect) {
      this.setState({ isSubmitted: true });
    } else if (this.state.emailIncorrect && !this.state.passwordIncorrect) {
      this.setState({emailErrorVisibility: ''});
    } else if (!this.state.emailIncorrect && this.state.passwordIncorrect) {
      this.setState({passwordErrorVisibility: ''});
    } else {
      this.setState({emailErrorVisibility: ''});
      this.setState({passwordErrorVisibility: ''});
    }
  };

  handleChangeEmail = (event) => {
    const input = event.target.value;
    const regex = RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$', 'gm');
    const isCorrect = regex.test(input);
    if (isCorrect) {
      this.setState({emailIncorrect: false});
    } else {
      this.setState({emailIncorrect: true, emailErrorVisibility: ''});
    };
    this.setState({ email: event.target.value });
  };

  handleChangePassword = (event) => {
    const inputPass = event.target.value;
    const regexPass = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})', 'gm');
    const isCorrectPass = regexPass.test(inputPass);
    if (isCorrectPass) {
      this.setState({passwordIncorrect: false});
    } else {
      this.setState({passwordIncorrect: true, passwordErrorVisibility: ''});
    };
    this.setState({ password: event.target.value });
  };

  handleLogout = () => {
    this.setState({ password: '', email: '', isSubmitted: false, emailIncorrect: true, passwordIncorrect: true, emailErrorVisibility: 'hidden', passwordErrorVisibility: 'hidden' });
  };

  render() {
    return (
      <>
        {this.state.isSubmitted === false && (
          <section className='mainWindow'>
            <div>
              <label>E-mail:</label>
              <input
                onChange={this.handleChangeEmail}
                value={this.state.email}
              />
              {this.state.emailIncorrect === true && (
                <span className={"red " + this.state.emailErrorVisibility}>Provided e-mail is invalid</span>
              )}
            </div>

            <div>
              <label>Password:</label>
              <input
                onChange={this.handleChangePassword}
                type="password"
                value={this.state.password}
              />
              {this.state.passwordIncorrect === true && (
                <span className={"red " + this.state.passwordErrorVisibility}>Password should consist of at least 8 characters including 1 lowercase, 1 uppercase, 1 numeric and 1 special character!</span>
              )}
            </div>

            <button onClick={this.handleLogin}>Login</button>
          </section>
        )}

        {this.state.isSubmitted === true && (
          <section className='mainWindow'>
            <div>
              <label>E-mail:</label> {this.state.email}
            </div>

            <div>
              <label>Password:</label> {this.state.password}
            </div>
            <button onClick={this.handleLogout}>Logout</button>
          </section>
        )}
      </>
    );
  }
}

export default App;
