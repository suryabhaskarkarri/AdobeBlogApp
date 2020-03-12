import React from 'react';
import { withRouter } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';

import Signin from './Signin.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import AllPosts from './AllPosts.jsx';

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                {/* <Redirect exact from="/" to="/home" /> */}
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
                <Route path="/allposts" component={AllPosts} />
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/post" component={Home} />
                <Route path="/profile" component={Home} />
                <Route render={() => <h1>404 Error</h1>} />
            </Switch>
        );
    }
}

export default withRouter(Routes);
