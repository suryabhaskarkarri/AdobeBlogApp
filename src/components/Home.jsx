import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

import Profile from './Profile.jsx';
import AddPost from './AddPost.jsx';
import ShowPost from './ShowPost.jsx';

class Home extends React.Component {
    onLogout = e => {
        e.preventDefault();
        e.stopPropagation();
        const { history } = this.props;
        axios
            .post('/ds/logout', {})
            .then(function(response) {
                console.log('logged out successfully');
                history.push('/signin');
            })
            .catch(function(error) {
                console.log('error logging out', error);
            });
    };

    render() {
        const { match } = this.props;
        return (
            <div className="home-container">
                <div className="menu-container">
                    <nav>
                        <ul className="nav nav-pills pull-right">
                            <li
                                role="presentation"
                                id="homeHyperlink"
                                className="active">
                                <Link to="/">Home</Link>
                            </li>
                            <li role="presentation" id="addHyperLink">
                                <Link to="/post">Create Post</Link>
                            </li>
                            <li role="presentation" id="viewAllHyperLink">
                                <Link to="/allposts">View All Posts</Link>
                            </li>
                            <li role="presentation" id="profileHyperlink">
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li role="presentation">
                                <a href="/" onClick={this.onLogout}>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path="/post" component={AddPost}></Route>
                        <Route path="/profile" component={Profile}></Route>
                        <Route path="/" component={ShowPost}></Route>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);
