import { useState } from "react";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let handleUsername = (e) => {
        setUsername(e.target.value);
    }
    let handlePassword = (e) => {
        setPassword(e.target.value);
    }

    let handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            body: JSON.stringify({
                username, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 200) {
            alert("Registration successfull")
        } else {
            alert("Registration failed");
        }
    }
    return(
        <>
            <form className="register" onSubmit={handleSubmit}>
            <h1>Register</h1>
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

                <button>Register</button>
            </form>
        </>
    );
}