import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8080/profile', {
      credentials: 'include'
    }).then((res) => {
      res.json().then(userInfo => {
        setUsername(userInfo.username)
      })
    })
  }, []);

  let logout = () => {
    fetch('http://localhost:8080/logout', {
      credentials: 'include',
      method: 'POST'
    })
    setUsername(null);
  }

  return (
    <header>
      <Link to="/" className='logo'>My Blog</Link>
      <nav>
        {username && (
          <>
            <Link to='/create'>Create new post</Link>
            <a onClick={logout} href="">Log Out</a>
          </>
        )}

        {!username && (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}