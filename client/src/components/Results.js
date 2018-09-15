import React, {Component} from 'react';
import update from 'react-addons-update';
import InputForm from "./InputForm";
import Message from "./Message";


class Results extends Component {
    constructor() {
        super();
        this.state = {posts: [], updatePostID: -1, updateText: ""};

        this.addNewPost = this.addNewPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.updateClicked = this.updateClicked.bind(this);
    }

    componentDidMount() {
        this.retrievePosts();
    }

    retrievePosts() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/posts", true);

        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return;
            if(xhr.status !== 200){
                // Error!
                return;
            }

            this.setState({posts: JSON.parse(xhr.responseText)});
        }

        xhr.send();
    }

    addNewPost(post) {
        this.setState({
            posts: this.state.posts.concat([post])
        });
    }

    deletePost(postID) {
            let index = this.state.posts.map(x => {
                return x._id;
            }).indexOf(postID);

            if(index !== -1) {
                this.setState({
                    posts: this.state.posts.filter((_, i) => i !== index)
                });
            }
    }

    updatePost(postID, newBody) {
        let index = this.state.posts.map(x => {
            return x._id;
        }).indexOf(postID);

        if(index !== -1) {
            this.setState({
                posts: update(this.state.posts, {[index]: {body: {$set: newBody}}})
            })
        }
    }

    updateClicked(postID, body) {
        this.setState({updatePostID: postID, updateText: body});
        this.refs.updateField.refs.textfield.value = body;
    }

    render() {
        let listItems = this.state.posts.map((post) => <Message key={post._id} postID={post._id} body={post.body} removeFromParent={this.deletePost} triggerUpdateForm={this.updateClicked}/>);

        return (
            <div>
                <p>Results</p>
                <InputForm type="Submit" addToParent={this.addNewPost}/>
                <InputForm ref="updateField" val={this.state.updateText} postID={this.state.updatePostID} type="Update" updateParent={this.updatePost}/>
                {listItems.reverse()}
            </div>
        )
    }
}
export default Results;