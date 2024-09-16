import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

export default function LogInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const {setUserInfo} = useContext(UserContext);

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
        });

        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            })
        } else {
            alert("Registration failed")
        }
    }

    if (redirect) {
        return <Navigate to = {'/'}/>
    } else {
        alert("wrong username or password");
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