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
                { label: "Going to learn React", important: true, like: false, id: 1 },
                { label: "That is so good", important: false, like: false, id: 2 },
                { label: "I need a break...", important: false, like: false, id: 3 }
            ],
            term: '',
            filter: 'all'
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

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


    // Переключение item
    onToggleItem(id, item) {
        this.setState(({ data }) => {
            const index = data.findIndex(elem => elem.id === id)                            //^ Ищем элемент по id

            const old = data[index];                                                        //^ Сохраняем элемент
            const newItem = { ...old, [item]: !old[item] };                                 //^ Меняем свойство like у элемента и формируем новый объект

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)]     //^ Формируем новый массив с объектом newItem

            return {
                data: newArr                                                                //^ Возращаем новый массив
            }
        })
    }

    // Переключение important
    onToggleImportant(id) {
        this.onToggleItem(id, 'important')
    }

    // Переключение like
    onToggleLiked(id) {
        this.onToggleItem(id, 'like')
    }

    // Фильтр по строке поиска
    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => {                                                     //^ Возвращение массива с отфильтрованными объектами
            return item.label.indexOf(term) > -1
        });
    }

    // Обновление state.term
    onUpdateSearch(term) {
        this.setState({ term })
    }

    // Фильтр по лайкам
    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like)                                          //^ Возвращение массива с отфильтрованными объктами
        } else {
            return items
        }
    }

    // Обновление state.filter
    onFilterSelect(filter) {
        this.setState({ filter })
    }

    render() {
        const { data, term, filter } = this.state,
            liked = data.filter(item => item.like).length,                                  //^ Вытаскиваем количество элементов с like: true
            allPost = data.length;                                                          //^ Количество всех постов

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);          //^ Видимые посты

        return (
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPost={allPost} />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch} />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect} />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked} />
                <PostAddForm
                    onAdd={this.addItem} />
            </div>
        )
    }
}