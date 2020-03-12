import React from 'react';
import { Link } from 'react-router-dom';

import './../styles/signin.scss';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: null,
        };
    }
    signIn = () => {
        const { history } = this.props;
        axios
            .post('/ds/signin', {
                email: this.state.email,
                password: this.state.password,
            })
            .then(function(response) {
                if (response.data == 'success') {
                    history.push('/home');
                } else {
                    this.setState({ errorMessage: 'Login failed' });
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ errorMessage: 'Error signing in' });
            });
    };
    handleEmailChange = e => {
        this.setState({ email: e.target.value });
    };
    handlePasswordChange = e => {
        this.setState({ password: e.target.value });
    };
    render() {
        const { errorMessage } = this.state;
        return (
            <div className="signin-container">
                <form className="form-signin">
                    <h4 className="form-signin-heading">Please sign in</h4>
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
                        onClick={this.signIn}
                        type="button">
                        Sign in
                    </button>
                </form>
                {errorMessage && (
                    <div className="alert alert-danger">{errorMessage}</div>
                )}
                <div className="allposts-link">
                    <Link to="/allposts">{'View All Posts'}</Link>
                </div>
                <div className="signup-link">
                    <Link to="/signup">{'Sign Up'}</Link>
                </div>
            </div>
        );
    }
}

export default Signin;
