import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/post').then(response => {
            response.json().then(posts => {
                console.log(posts);
                setPosts(posts);
            })
        })
    }, []);
    return(
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post}/>
            ))}


            {/* <img src="pic.png" alt="" />
            <h1>Hello</h1> */}
            {/* <img src="https://cdn.pixabay.com/photo/2018/05/11/08/34/sky-3389832_1280.jpg" alt="" /> */}
        </>
    );
}