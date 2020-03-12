import React from 'react';
import { Link } from 'react-router-dom';

import './../styles/signup.scss';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
        };
    }

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    };
    handleEmailChange = e => {
        this.setState({ email: e.target.value });
    };
    handlePasswordChange = e => {
        this.setState({ password: e.target.value });
    };
    signUp = () => {
        axios
            .post('/ds/signup', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            })
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    };
    render() {
        return (
            <div className="signup-container">
                <form className="form-signup">
                    <h4 className="form-signin-heading">Please sign up</h4>
                    <label htmlFor="inputName" className="sr-only">
                        Name
                    </label>
                    <input
                        type="name"
                        onChange={this.handleNameChange}
                        id="inputName"
                        className="form-control"
                        placeholder="Name"
                        required
                        autoFocus
                    />
                    <label htmlFor="inputEmail" className="sr-only">
                        Email address
                    </label>
                    <input
                        type="email"
                        onChange={this.handleEmailChange}
                        id="inputEmail"
                        className="form-control"
                        placeholder="Email address"
                        required
                        autoFocus
                    />
                    <label htmlFor="inputPassword" className="sr-only">
                        Password
                    </label>
                    <input
                        type="password"
                        onChange={this.handlePasswordChange}
                        id="inputPassword"
                        className="form-control"
                        placeholder="Password"
                        required
                    />

                    <button
                        className="btn btn-lg btn-primary btn-block"
                        onClick={this.signUp}
                        type="button">
                        Sign up
                    </button>
                </form>
                <div className="signin-link">
                    <Link to="/signin">{'Sign In'}</Link>
                </div>
            </div>
        );
    }
}

export default Signup;
