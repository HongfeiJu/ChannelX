import React from 'react';
import './SearchBar.css'

export  default class SearchBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            suggestions: [],
            text: '',
        }
    }

    onTextChanged = (e) =>{
        const {items} = this.props;
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({suggestions, text : value}));
    };

    suggestionSelected (value) {
        this.setState( () => ({
            text: value,
            suggestions: []
        }));
    }

    renderSuggestions () {
        const {suggestions} = this.state;
        if(suggestions.length === 0) {
            return null;
        } else {
            return (
                <ul aria-setsize = "3">
                    {suggestions.map((item) => <li onClick={()=>this.suggestionSelected(item)}>{item}</li>)}
                </ul>
            )
        }
    }

    render () {
        const { text } = this.state;
        return (
            <div className="SearchBar">
                <input
                    id = "SearchChannelText"
                    value = {text}
                    onChange={this.onTextChanged}
                    type = "text"
                    placeholder="Search here"
                />
                {this.renderSuggestions()}
            </div>
        );
    }
}