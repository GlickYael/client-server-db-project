import React, { useEffect, useRef, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import "../pages/pages_css/Post.css";
function Post() {
  const URL_API = "http://localhost:3000";
  const id = useOutletContext();
  console.log(`userId:${id}`);
  const [jsonPostList, setJsonPostList] = useState();
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [addPostButton, setAddPostButton] = useState(false);
  const [searchPostId, setSearchPostId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const updateTitle = useRef("");
  const updateBody = useRef("");
  useEffect(() => {
    document.body.classList.add("post-page");
    (async () => await fetchPost())();
    return () => {
      document.body.classList.remove("post-page");
    };
  }, []);
  useEffect(() => {
    if (searchTerm == "" && searchPostId == "") {
      setPosts(jsonPostList);
    } else {
      setPosts(
        jsonPostList
          .filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((post) =>
            searchPostId ? post.id.toString() === searchPostId : true
          )
      );
    }
  }, [searchTerm, searchPostId]);
  const fetchPost = async () => {
    try {
      const response = await fetch(`${URL_API}/users/${id}/posts`);
      if (!response.ok) {
        throw Error("Did not received expected data");
      }
      const result = await response.json();
      setJsonPostList(result);
      setPosts(result);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  function addPost() {
    setAddPostButton(!addPostButton);
  }
  const createPostInDataBase = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: id,
      title: updateTitle.current,
      body: updateBody.current,
    };
    const response = await fetch(`${URL_API}/posts`, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((error) => {
      console.log("Error:", error);
    });
    const result = await response.json();
    setPosts((previousPosts) => [...previousPosts, result]);
    setAddPostButton(false);
  };

  const deletePost = async (e) => {
    const postId = e.target.value;
    const myPost = posts.filter((post) => {
      return post.Id != postId;
    });
    try {
      const response = await fetch(`${URL_API}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw Error("Failed to update post");
      } else {
        setPosts(myPost);
      }
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  function watchPostHandler(e) {
    const postId = e.target.value;
    navigate(`/Post/${postId}`);
  }
  function clearHandler() {
    setSearchTerm("");
    setSearchPostId("");
  }

  return (
    <div className="container">
      {isLoading && <Loading />}
      {fetchError && <Error message={fetchError} />}
      <div className="searchSortAndAdd">
        <button onClick={addPost}>
          add post <i className="fa-solid fa-plus"></i>
        </button>
        <br />
        <br />
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tasks"
          />
          <br />
          <input
            type="text"
            value={searchPostId}
            onChange={(e) => setSearchPostId(e.target.value)}
            placeholder="Search task by id"
          />
          <br />
          <button onClick={clearHandler}>Clear</button>
        </div>

        {addPostButton && (
          <form>
            <label name="title" htmlFor="title">
              <i className="fa-solid fa-circle-xmark" onClick={addPost}></i>
              title:
            </label>
            <input
              name="title"
              id="title"
              onChange={(e) => (updateTitle.current = e.target.value)}
              type="text"
            />
            <br />
            <label name="body" htmlFor="body">
              post:
            </label>
            <input
              name="body"
              id="body"
              onChange={(e) => (updateBody.current = e.target.value)}
            />
            <button className="save-btn" onClick={createPostInDataBase}>
              save changes
            </button>
          </form>
        )}
      </div>
      {!isLoading &&
        !fetchError &&
        posts.map((post, key) => {
          return (
            <div className="post-item">
              {post.Id} :<h4>{post.title}</h4>
              <button
                onClick={watchPostHandler}
                className="view-btn"
                value={post.Id}
              >
                view post
              </button>
              <button
                onClick={deletePost}
                className="delete-btn"
                value={post.Id}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default Post;
