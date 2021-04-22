import React from 'react';
import PostListItem from '../post-list-item';

const PostList = ({ posts }) => {

    const elements = posts.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <li key={id} className='list-group-item'>
                {/* <PostListItem
                    label={item.label}
                    imortant={item.imortant} />         //^ Старый формат записи */}

                <PostListItem {...itemProps} />       {/*//^ Новый формат с помощью разворота. Если ключи и значения названы одноименно  */}
            </li>
        )
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}
export default PostList;