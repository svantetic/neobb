import React, { useState, ChangeEvent } from 'react';
import * as ReactDOM from 'react-dom';
import { json } from 'express';

declare global {
    interface Window {
        threadId: string | number;
    }
}

const App = () => {
    const submit = async (event: any, content: string) => {
        event.preventDefault();
        try {
            const response = await fetch('/post', {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({ content, threadId: window.threadId, }),
            });
            if (response.ok) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <React.Fragment>
            <NewPostForm submit={submit} /> 
        </React.Fragment>
    )
}

const NewPostForm = ({ submit }: { submit: (event: any, content: string) => void}) => {
    const [content, setContent] = useState('');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.currentTarget.value);
    }
    const handleSubmit = (event: any) => {
        submit(event, content);
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="content" className="block">Content</label>
            <textarea onChange={handleChange} value={content} required className="shadow-xl block w-full mb-10 p-4" id="content" cols={30} rows={10} name="content"></textarea>
            <SubmitButton type="submit" text="Submit"/>
        </form>
    )
}

const SubmitButton = ({ type, text }: { type: "submit", text: string}) => (
    <button className="px-4 py-4 bg-green-500 text-white mt-8 w-auto hover:bg-blue-800 rounded" type={type}>
        { text }
    </button>
)

ReactDOM.render(<App />, document.getElementById('post-mount'));