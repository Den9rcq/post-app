import React from 'react';

const AppHeader = ({ liked, allPost }) => {
    return (
        <div className="app-header d-flex">
            <h1>Denis Bugreev</h1>
            <h2>{allPost} записей, из них понравилось {liked}</h2>
        </div>
    )
}
export default AppHeader;