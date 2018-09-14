import React, {Component} from 'react';
import InputForm from "./InputForm";
import Message from "./Message";


class Results extends Component {
    constructor() {
        super();
        this.state = {posts: []};

        this.addNewPost = this.addNewPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
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
        var index = this.state.posts.map(x => {
            return x.id;
        }).indexOf(postID);

        if(index !== -1) {
            this.state.posts.splice(index, 1);
            this.setState({
                posts: this.state.posts
            });
        }
    }

    render() {
        let listItems = this.state.posts.map((post) => <Message key={post.id} postID={post.id} body={post.body} removeFromParent={this.deletePost}/>);

        return (
            <div>
                <p>Results</p>
                <InputForm addToParent={this.addNewPost}/>
                {listItems}
            </div>
        )
    }
}
export default Results;