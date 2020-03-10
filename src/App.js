import React, {Component} from 'react';
import './App.css';

import ValidationComponent from './ValidationComponent/ValidationComponent'
import CharComponent from './CharComponent/CharComponent'

class App extends Component {

    state = {
        lengthOfText: 0,
        textTooShort: true,
        text: [],
    }

    toggleValidationMessage = (textLength) => {
        this.setState({textTooShort: textLength <= 5})
    }

    changedHandler = (event) => {
        const textLength = event.target.value.length;
        // const originalText = this.state.text;
        const inputText = event.target.value.split('');


        this.setState({
            lengthOfText: textLength,
            text: inputText,
        })

        this.toggleValidationMessage(textLength)
    }

    removeChar = (index) => {
        const text = [...this.state.text];
        text.splice(index, 1);
        this.setState({text: text})
    }

    render() {
        let validationMessage = 'Text too short'

        if (!this.state.textTooShort) {
            validationMessage = 'Text long enough'
        }

        let texts = null;

        if (this.state.text.length > 0) {
            texts = (
                <div>
                    {this.state.text.map((char, index) => {
                        return <CharComponent
                            click={() => this.removeChar(index)}
                            character={char}
                        />
                    })}
                </div>
            )
        }


        return (
            <div className="App">
                <input type="text" onChange={this.changedHandler}/>
                <p>{this.state.lengthOfText}</p>
                <ValidationComponent message={validationMessage}/>
                {texts}
            </div>

        );

    }
}

export default App;
