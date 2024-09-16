import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  // const [username, setUsername] = useState(null);
  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {

    fetch('http://localhost:8080/profile', {
      credentials: 'include'

    }).then((res) => {

      res.json().then(userInfo => {
        setUserInfo(userInfo)

      })

    })

  }, []);

  let logout = () => {
    fetch('http://localhost:8080/logout', {
      credentials: 'include',
      method: 'POST'
    })
    setUserInfo(null);
  }

  const username = userInfo?.username;

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