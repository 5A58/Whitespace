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

    render() {
        return (
            <div className={"message"}>
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