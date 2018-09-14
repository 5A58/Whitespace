import React, {Component} from 'react';

class Message extends Component {
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/posts/" + this.props.postID, true)

        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return;
            if(xhr.status !== 200) {
                // Error!
                return;
            }

            // Delete post from page
            this.props.removeFromParent(this.props.postID);
        }

        xhr.send();
    }

    render() {
        var messageStyle = {
            background: "gray",
            margin: "1em",
            position: "relative"
        };

        var deleteButton = {
            background: "red",
            height: "100%",
            width: "1.5em",
            display: "inline-flex",
            justifyContent: "center",
            position: "absolute",
            right: "0"
        }

        var editButton = {
            background: "orange",
            height: "100%",
            width: "3.2em",
            display: "inline-flex",
            justifyContent: "center",
            position: "absolute",
            right: "1.5em"
        }

        return (
            <div style={messageStyle}>
                {this.props.body}
                <div style={deleteButton} onClick={this.handleDelete}>X</div>
                <div style={editButton} onClick={() => this.props.triggerUpdateForm(this.props.postID)}>EDIT</div>
            </div>
        )
    }
}
export default Message;