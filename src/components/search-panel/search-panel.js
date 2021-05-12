import React, { Component } from 'react';

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.onUpdateSearch = this.onUpdateSearch.bind(this)
    }

    // Записываем в state, то что ввёл пользователь в input
    onUpdateSearch(e) {
        const term = e.target.value;
        this.setState({ term });                          //^ term: term
        // ! Не рекурсия
        this.props.onUpdateSearch(term);                  //^ Функция из props app.js
    }

    render() {
        return (
            <input
                className="form-control search-input"
                type="text"
                placeholder="Поиск по записям"
                onChange={this.onUpdateSearch}
            />
        )
    }
}
