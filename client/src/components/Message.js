import React, {Component} from 'react';
import "../styles/message.scss";
import InputForm from "./InputForm";

class Message extends Component {
    constructor() {
        super();

        this.state = {renderOptions: false};

        this.handleDelete = this.handleDelete.bind(this);
        this.arrowClicked = this.arrowClicked.bind(this);
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

    arrowClicked() {
        this.setState({renderOptions: !this.state.renderOptions});
    }

    computeDateString(d) {
        let today = new Date(Date.now());
        let postDate = new Date(d);

        if(postDate.toDateString() === today.toDateString()) {
            // Post is from today
            let oneMinute = 60 * 1000; // seconds * milliseconds
            let diffMins = Math.round(Math.abs((today.getTime() - postDate.getTime())/(oneMinute)));

            if(diffMins === 0) {
                return "Now"
            } else if (diffMins >= 60) {
                let oneHour = 60 * 60 * 1000; // minutes * seconds * milliseconds
                let diffHours = Math.round(Math.abs((today.getTime() - postDate.getTime())/(oneHour)));
                return (diffHours === 1 ? diffHours + " hour ago" : diffHours + " hours ago");
            } else {
                return (diffMins === 1 ? diffMins + " minute ago" : diffMins + " minutes ago");
            }
        } else {
            let oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
            let diffDays = Math.round(Math.abs((today.getTime() - postDate.getTime())/(oneDay)));

            if(diffDays >= 7) {
                let original = postDate.toDateString();
                // Remove day of week from date string
                let noDay = original.substr(original.indexOf(" ") + 1);
                return noDay;
            } else {
                return (diffDays === 1 ? diffDays + " day ago" : diffDays + " days ago");
            }

        }
    }

    render() {
        return (
            <div className={"message"}>
                <p className={"dateString"}>{this.computeDateString(this.props.creationDate)}</p>
                {this.props.body}
                <svg onClick={this.arrowClicked} className={"arrow"} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z"/></svg>
                {(this.state.renderOptions === false) ? null :
                    <div className={"optionsContainer"}>
                        <button className={"deleteButton"} onClick={this.handleDelete}>X</button>
                        <button className={"editButton"} onClick={() => this.props.triggerUpdateForm(this.props.postID, this.props.body)}>Edit</button>
                    </div>
                }
            </div>
        )
    }
}
export default Message;