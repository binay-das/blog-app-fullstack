import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { Navigate } from 'react-router-dom';


const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
];

export default function CreatePost() {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    let handleTitle = (e) => {
        setTitle(e.target.value);
    }
    let handleSummary = (e) => {
        setSummary(e.target.value);
    }
    let handleContent = (newValue) => {
        setContent(newValue);
    }

    let handleFile = (e) => {
        setFiles(e.target.files);
    }

    let createNewPost = async (e) => {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        e.preventDefault();
        const response = await fetch('http://localhost:8080/post', {
            method : "POST",
            body: data,

        })

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    
    return (
        <>
            <form action="" onSubmit={createNewPost}>
                <input
                    type="text"
                    placeholder="title"
                    onChange={handleTitle}
                    value={title}
                />

                <input
                    type="text"
                    placeholder="Summary"
                    onChange={handleSummary}
                    value={summary}
                />

                <input 
                    type="file" 
                    onChange={handleFile}
                />

                <ReactQuill
                    value={content}
                    onChange={handleContent}
                    modules={modules}
                    formats={formats}
                />

                <button style={{ marginTop: '5px' }}>Create Post</button>
            </form>
        </>
    );
}