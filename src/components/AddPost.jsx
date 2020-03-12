import React from 'react';
import queryString from 'query-string';

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            id: null,
        };
    }
    componentDidMount() {
        document.getElementById('addHyperLink').className = 'active';
        document.getElementById('homeHyperlink').className = '';
        document.getElementById('profileHyperlink').className = '';
        this.getPostWithId();
    }

    getPostId = () => {
        const values = queryString.parse(this.props.location.search);
        return values.id;
    };

    addPost = () => {
        const { history } = this.props;
        axios
            .post('/ds/addPost', {
                title: this.state.title,
                description: this.state.description,
                id: this.getPostId(),
            })
            .then(response => {
                console.log('reponse from add post is ', response);
                history.push('/');
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    getPostWithId = () => {
        var id = this.getPostId();
        if (!id) {
            return;
        }
        axios
            .post('/ds/getPostWithId', {
                id: id,
            })
            .then(response => {
                if (response) {
                    this.setState({ title: response.data.title });
                    this.setState({ description: response.data.description });
                }
            })
            .catch(function(error) {
                console.log('error is ', error);
            });
    };

    handleTitleChange = e => {
        this.setState({ title: e.target.value });
    };
    handleDescriptionChange = e => {
        this.setState({ description: e.target.value });
    };

    render() {
        const postId = this.getPostId();
        return (
            <div className="col-md-5">
                <div className="form-area">
                    <form role="form">
                        <br styles="clear:both" />
                        <div className="form-group">
                            <input
                                value={this.state.title}
                                type="text"
                                onChange={this.handleTitleChange}
                                className="form-control"
                                name="title"
                                placeholder="Title"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                value={this.state.description}
                                className="form-control"
                                onChange={this.handleDescriptionChange}
                                type="textarea"
                                placeholder="Description"
                                maxLength="140"
                                rows="7"></textarea>
                        </div>

                        <button
                            type="button"
                            onClick={this.addPost}
                            id="submit"
                            name="submit"
                            className="btn btn-primary pull-right">
                            {postId ? 'Update Post' : 'Add Post'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddPost;
