import React, {Component} from 'react';

class InputForm extends Component {
    render() {
        return (
            <form action="/new" method="POST">
                <input type="text" name="postBody" placeholder="Post"/>
                <button>Submit</button>
            </form>
        )
    }
}

export default InputForm;