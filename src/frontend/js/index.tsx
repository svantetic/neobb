import React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => (
    <NewPostButton text="Reply" />
)

const NewPostButton = (props: { text: string }) => (
    <button className="px-4 py-4 bg-blue-500 text-white mt-8 w-auto hover:bg-blue-800 rounded" type="button">
        { props.text }
    </button>
)

ReactDOM.render(<App />, document.getElementById('post-mount'));