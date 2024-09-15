import { useState } from "react";

export default function LogInPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    let handleUsername = (e) => {
        setUsername(e.target.value);
    }
    let handlePassword = (e) => {
        setPassword(e.target.value);
    }

    let handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify({
                username, password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        // if (response.status === 200) {
        //     alert("Registration successfull");
        // } else {
        //     alert("Registration failed");
        // }

        if (response.ok) {
            setRedirect(true);
        } else {
            alert("Registration failed")
        }
    }

    if (redirect) {
        return <Navigate to = {'/'}/>
    }



    return (
        <>
            <form className="login" onSubmit={handleSubmit}>
            <h1>Log In</h1>
                <input 
                type="text"
                 placeholder="username" 
                 value={username}
                 onChange={handleUsername}
                 />
                <input 
                type="password" 
                placeholder="password" 
                value={password}
                onChange={handlePassword}
                />

                <button>Log In</button>
            </form>
        </>
    );
}