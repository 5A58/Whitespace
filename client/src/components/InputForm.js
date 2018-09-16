import React, {Component} from 'react';
import "../styles/input.scss";

class InputForm extends Component {
    constructor() {
        super();

        this.addPost = this.addPost.bind(this);
        this.updatePost = this.updatePost.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addPost() {
        let postField = document.querySelector("#submitBody");
        let postBody = postField.value;

        if(postBody.trim().length === 0) {
            return false;
        }

        // Create XHR
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/posts/new", true);
        // Define request parameters
        let parameters = JSON.stringify({postBody});

        // Set content type
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return;
            if(xhr.status !== 200) {
                // Error!
                return;
            }

            // Clear form
            postField.value = "";

            // Render the post
            this.props.addToParent(JSON.parse(xhr.responseText));

            // Unrender form
            this.props.unrenderSelf();
        }

        xhr.send(parameters);
    }

    updatePost() {
        if (this.props.postID === -1) {
            return;
        }

        let postField = document.querySelector("#updateBody");
        let postBody = postField.value;

        if(postBody.trim().length === 0) {
            return;
        }

        // Create XHR
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", "/posts/" + this.props.postID, true);

        // Define request parameters
        let parameters = JSON.stringify({postBody});

        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return;
            if(xhr.status !== 200) {
                // Error!
                return;
            }


            // Clear form
            postField.value = "";

            // Render the post
            this.props.updateParent(this.props.postID, postBody);

            // Unrender form
            this.props.unrenderSelf();
        }

        xhr.send(parameters);
    }

    handleSubmit(e) {
        // Don't submit form
        e.preventDefault();

        // Determine which action to perform
        if(this.props.type === "Submit") return this.addPost();
        if(this.props.type === "Update") return this.updatePost();
    }

    render() {
        return (
            <div id={"formContainer"}>
                <form className={"postForm"} action={this.props.route} method="POST" onSubmit={this.handleSubmit}>
                    <textarea className={"bodyField"} ref="textfield" id={this.props.type.toLowerCase() + "Body"} rows="4" cols="50" name="postBody" placeholder="Post"/>
                    <br/>
                    <button className={"submitButton"}>{this.props.type}</button>
                </form>
            </div>
        )
    }
}

export default InputForm;