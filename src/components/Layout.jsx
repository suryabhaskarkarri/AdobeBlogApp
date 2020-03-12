import React from 'react';
import { withRouter } from 'react-router';
import Routes from './Routes.jsx';

class Layout extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <Routes />
            </div>
        );
    }
}

export default withRouter(Layout);
