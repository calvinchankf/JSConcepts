import React from "react";
import genFetch from "../utils/genFetch";

const fetchFn = genFetch("https://jsonplaceholder.typicode.com/posts");

const Posts = () => {
    const posts = fetchFn.read()
    return (
        <div className="post-wrapper">
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
        </div>
    );
};
export default Posts;