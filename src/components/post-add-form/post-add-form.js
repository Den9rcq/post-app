import React, { Component } from 'react';

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    // Записываем данные в state
    onValueChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    // Отправляем данные в body нового поста
    onSubmit(e) {
        e.preventDefault();                                     //^ Отменяем стандартное поведение браузера
        this.props.onAdd(this.state.text)                       //^ Записваем значение в новый пост
        this.setState({
            text: ''                                            //^ Очищаем state (для очищения инпута)
        })
    }

    render() {
        return (
            <form
                className="bottom-panel d-flex"
                onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="О чем вы думаете сейчас?"
                    className="form-control new-post-label"
                    onChange={this.onValueChange}               //^ Отслеживаем что пользователь ввёл в input
                    value={this.state.text}                     //^ Контролируеммый элемент (для очищение инпута, после отправки)
                />
                <button
                    type="submit"
                    className="btn btn-outline-secondary">
                    Добавить</button>
            </form>
        )
    }
}
