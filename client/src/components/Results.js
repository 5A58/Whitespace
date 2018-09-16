import React, {Component} from 'react';
import update from 'react-addons-update';
import socketIOClient from "socket.io-client";
import InputForm from "./InputForm";
import Message from "./Message";
import "../styles/results.scss";
import "../styles/input.scss";

class Results extends Component {
    constructor() {
        super();
        this.state = {posts: [],
            updatePostID: -1,
            updateText: "",
            endpoint: "localhost:5000",
            renderUpdateField: false,
            renderSubmitField: false};

        this.addNewPost = this.addNewPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.updateClicked = this.updateClicked.bind(this);
        this.toggleRenderUpdate = this.toggleRenderUpdate.bind(this);
        this.toggleRenderSubmit = this.toggleRenderSubmit.bind(this);
    }

    componentDidMount() {
        // testing for socket connections
        const socket = socketIOClient(this.state.endpoint);
        this.retrievePosts();
        document.querySelector("body").style = "background: #e6ecf0;";
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
                posts: update(this.state.posts, {[index]: {body: {$set: newBody}}}),
                updatePostID: -1,
                updateText: ""
            })
        }
    }

    updateClicked(postID, body) {
        this.setState({updatePostID: postID, updateText: body});
        this.refs.updateField.refs.textfield.value = body;
    }

    toggleRenderUpdate() {
        this.setState({renderUpdateField: !this.state.renderUpdateField});
    }

    toggleRenderSubmit() {
        this.setState({renderSubmitField: !this.state.renderSubmitField});
    }


    render() {
        let listItems = this.state.posts.map((post) => <Message key={post._id} postID={post._id} body={post.body} removeFromParent={this.deletePost} triggerUpdateForm={this.updateClicked}/>);

        return (
            <div>
                <button className={"submitButton"} onClick={this.toggleRenderSubmit}>Add New Post</button>
                {(this.state.renderSubmitField == false) ? null : <InputForm unrenderSelf={this.toggleRenderSubmit} className={"postInput"} type="Submit" addToParent={this.addNewPost}/> }
                {(this.state.renderUpdateField == false) ? null : <InputForm  unrenderSelf={this.toggleRenderUpdate} className={"postInput"} ref="updateField" val={this.state.updateText} postID={this.state.updatePostID} type="Update" updateParent={this.updatePost}/>}
                <div id={"messageContainer"}>
                    {listItems.reverse()}
                </div>
            </div>
        )
    }
}
export default Results;