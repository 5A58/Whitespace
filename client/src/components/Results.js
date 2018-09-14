import React, {Component} from 'react';
import InputForm from "./InputForm";
import Message from "./Message";


class Results extends Component {
    constructor() {
        super();
        this.state = {posts: []};
    }

    componentDidMount() {
        this.retrievePosts();
    }

    retrievePosts() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/posts");

        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return;
            if(xhr.status !== 200){
                // Error!
            }

            this.setState({posts: JSON.parse(xhr.responseText)});
        }

        xhr.send();
    }

    render() {
        const listItems = this.state.posts.map((d) => <Message key={d.id} name={d.name}/>);

        return (
            <div>
                <p>Results</p>
                <InputForm/>
                {listItems}
            </div>
        )
    }
}
export default Results;