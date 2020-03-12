import React from 'react';

class AllPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    getPosts = () => {
        var self = this;
        axios
            .post('/ds/getAllPosts', {})
            .then(response => {
                console.log('response is ', response);
                self.setState({ posts: response.data });
            })
            .catch(error => {
                console.log('error is ', error);
            });
    };

    componentDidMount() {
        this.getPosts();
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Created By</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.posts.map(
                        function(post, index) {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{post.title}</td>
                                    <td>{post.username}</td>
                                </tr>
                            );
                        }.bind(this)
                    )}
                </tbody>
            </table>
        );
    }
}

export default AllPosts;
