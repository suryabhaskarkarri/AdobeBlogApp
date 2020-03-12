import React from 'react';

class ShowPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    updatePost = id => {
        const { history } = this.props;
        history.push('/post?id=' + id);
    };

    deletePost = id => {
        if (confirm('Are you sure ?')) {
            var self = this;
            axios
                .post('/ds/deletePost', {
                    id: id,
                })
                .then(function(response) {
                    self.getPost();
                })
                .catch(function(error) {
                    console.log('Error is ', error);
                });
        }
    };

    getPost = () => {
        const { history } = this.props;
        axios
            .post('/ds/getPost', {})
            .then(response => {
                console.log('response is ', response);
                this.setState({ posts: response.data });
            })
            .catch(error => {
                // TODO: check for response code 401
                history.push('signin');
                console.log('error is ', error);
            });
    };

    componentDidMount() {
        const { showOnlyUserPosts } = this.props;
        this.getPost(showOnlyUserPosts);
        if (showOnlyUserPosts) {
            document.getElementById('homeHyperlink').className = 'active';
            document.getElementById('addHyperLink').className = '';
            document.getElementById('profileHyperlink').className = '';
        }
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Created By</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.posts.map(
                        function(post, index) {
                            return (
                                <tr
                                    className="post-row"
                                    key={index}
                                    onClick={() => {
                                        this.updatePost(post._id);
                                    }}>
                                    <td>{index + 1}</td>
                                    <td>{post.title}</td>
                                    <td>{post.username}</td>
                                    <td>
                                        <span
                                            onClick={() => {
                                                this.updatePost(post._id);
                                            }}
                                            className="glyphicon glyphicon-pencil">
                                            Edit
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            onClick={() => {
                                                this.deletePost(post._id);
                                            }}
                                            className="glyphicon glyphicon-remove">
                                            Delete
                                        </span>
                                    </td>
                                </tr>
                            );
                        }.bind(this)
                    )}
                </tbody>
            </table>
        );
    }
}

export default ShowPost;
