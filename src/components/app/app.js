import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { label: "Going to learn React", important: true, id: 1 },
                { label: "That is so good", important: false, id: 2 },
                { label: "I need a break...", important: false, id: 3 }
            ]
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);

        this.maxId = 4;
    }

    // Удаляем элемент со страницы
    deleteItem(id) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id);           //^ Ищем по индоксу элемент

            //^ Разбиваем массив на до элемента и после
            const before = data.slice(0, index),
                after = data.slice(index + 1),
                newArr = [...before, ...after];                             //^ Создаём новый массив данных без элемента который нашли
            // ! На прямую state мы изменять не можем
            return {
                data: newArr                                                //^ Обновляем данные массива, т.е. удаляем элемент
            }
        });
    }

    // Добавляем элемент на страницу
    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        };

        this.setState(({ data }) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    render() {
        return (
            <div className="app">
                <AppHeader />
                <div className="search-panel d-flex">
                    <SearchPanel />
                    <PostStatusFilter />
                </div>
                <PostList
                    posts={this.state.data}
                    onDelete={this.deleteItem} />
                <PostAddForm
                    onAdd={this.addItem} />
            </div>
        )
    }
}

