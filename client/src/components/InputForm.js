import React, {Component} from 'react';

class InputForm extends Component {

    addPost(e) {
        // Do not submit form
        e.preventDefault();

        let postField = document.querySelector("#postBody");
        let postBody = postField.value;

        // Create XHR
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/new", true);
        // Define request parameters
        let parameters = JSON.stringify({postBody});

        // Set content type
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return;
            if(xhr.status !== 200) {
                // Error!
            }

            // Clear form
            postField.value = "";

            // Render the post
            this.props.addToParent(JSON.parse(xhr.responseText));
        }

        xhr.send(parameters);
    }

    render() {
        return (
            <form action="/new" method="POST" onSubmit={this.addPost.bind(this)}>
                <input id="postBody" type="text" name="postBody" placeholder="Post"/>
                <button>Submit</button>
            </form>
        )
    }
}

export default InputForm;