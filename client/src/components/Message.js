import React, {Component} from 'react';
import "../styles/message.scss";

class Message extends Component {
    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/posts/" + this.props.postID, true);

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
        return (
            <div className={"message"}>
                {this.props.body}
                <button className={"deleteButton"} onClick={this.handleDelete}>X</button>
                <button className={"editButton"} onClick={() => this.props.triggerUpdateForm(this.props.postID, this.props.body)}>Edit</button>
            </div>
        )
    }
}
export default Message;