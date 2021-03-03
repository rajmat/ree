import React, { useState, useEffect } from "react";

import "./app.css";

const App = (props) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    allPostsFetch();
  }, []);

  const allPostsFetch = () => {
    fetch(`http://localhost:8080/posts`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        let result = res.sort((a, b) => {
          return b.score - a.score;
        });
        setPosts(result);
      });
  };

  const upVoteFetch = (id) => {
    fetch(`http://localhost:8080/posts/${id}/upvote`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then(() => allPostsFetch());
  };
  const downVoteFetch = (id) => {
    fetch(`http://localhost:8080/posts/${id}/downvote`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then(() => allPostsFetch());
  };

  return (
    <>
      {/* <button
        onClick={() => {
          allPostsFetch();
        }}
      >
        császtok
      </button> */}

      <ul>
        {posts &&
          posts.map((post, index) => {
            return (
              <li key={index}>
                <div>
                  <section>
                    <h3>{post.title}</h3>
                    <p>{post.url}</p>
                    <p>{post.timestamp}</p>
                  </section>
                  <p className="score">
                    <span onClick={() => upVoteFetch(post.id)}>{"+"}</span>
                    {post.score}
                    <span onClick={() => downVoteFetch(post.id)}>{"-"}</span>
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default App;
