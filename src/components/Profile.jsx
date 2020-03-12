import React from 'react';

import './../styles/profile.scss';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            successMessage: null,
            errorMessage: null,
        };
    }
    componentDidMount() {
        document.getElementById('addHyperLink').className = '';
        document.getElementById('homeHyperlink').className = '';
        document.getElementById('profileHyperlink').className = 'active';
        this.getProfile();
    }
    updateProfile = () => {
        // reset messages before calling
        this.setState({
            successMessage: null,
            errorMessage: null,
        });
        const { history } = this.props;
        axios
            .post('/ds/updateProfile', {
                name: this.state.name,
                password: this.state.password,
            })
            .then(response => {
                if (response) {
                    this.setState({
                        successMessage: 'Profile updated successfully',
                    });
                }
            })
            .catch(error => {
                this.setState({
                    errorMessage: 'Failed to update the profile',
                });
                console.log('error is ', error);
            });
    };

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    };
    handlePasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    getProfile = () => {
        axios
            .post('/ds/getProfile', {})
            .then(response => {
                if (response) {
                    this.setState({ name: response.data.name });
                    this.setState({ email: response.data.email });
                    this.setState({ password: response.data.password });
                }
            })
            .catch(function(error) {
                console.log('error is ', error);
            });
    };

    render() {
        const { successMessage, errorMessage } = this.state;
        return (
            <div className="col-md-5 profile-container">
                <div className="form-area">
                    <form role="form">
                        <br styles="clear:both" />
                        <div className="form-group">
                            <input
                                value={this.state.name}
                                type="text"
                                onChange={this.handleNameChange}
                                className="form-control"
                                placeholder="Name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                value={this.state.password}
                                type="password"
                                onChange={this.handlePasswordChange}
                                className="form-control"
                                placeholder="Password"
                                required
                            />
                        </div>

                        <button
                            type="button"
                            onClick={this.updateProfile}
                            id="submit"
                            name="submit"
                            className="btn btn-primary pull-right">
                            Update
                        </button>
                    </form>
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Profile;
