import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import "../components/components_css/ViewPost.css";
import Error from "./Error";
import ViewComments from "./ViewComments";

function ViewPost() {
  const URL_API = "http://localhost:3000";
  const postId = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [post, setPost] = useState();
  const [updatePost, setUpdatePost] = useState(false);
  const [updateTitle, setUpdateTitle] = useState();
  const [updateBody, setUpdateBody] = useState();
  const [viewComments, setViewComments] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => await fetchPost())();
  }, []);
  const fetchPost = async () => {
    try {
      const response = await fetch(`${URL_API}/posts/${postId}`);
      if (!response.ok) {
        throw Error("Did not received expected data");
      }
      const result = await response.json();
      setPost(result);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  function updatePostHandler() {
    setUpdateTitle(post.title);
    setUpdateBody(post.body);
    setUpdatePost(!updatePost);
  }
  function updatePostInDataBase(e) {
    e.preventDefault();
    setUpdatePost(!updatePost);

    const updatedData = {
      userId: post.userId,
      id: post.id,
      title: updateTitle,
      body: updateBody,
    };

    fetch(`${URL_API}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update post");
        }
      })
      .then(() => {
        console.log("Post updated successfully:", updatedData);
        setPost(updatedData);
      })
      .catch((error) => {
        setFetchError("Error updating post:", error);
      });
  }

  const deletePost = async () => {
    try {
      const response = await fetch(`${URL_API}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw Error("Failed to delete post");
      } else {
        navigate("/Post");
      }
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  function commentsButtonHandler() {
    setViewComments(!viewComments);
  }
  function arrowHandler() {
    navigate("/Post");
  }

  return (
    <>
      {isLoading && <Loading />}
      {fetchError && <Error message={fetchError} />}
      {!updatePost && !isLoading && !fetchError && (
        <div className="post-container">
          <div className="post-header">
            <div className="post-buttons">
              <button onClick={commentsButtonHandler}>comments</button>
              <button onClick={deletePost}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
              <button onClick={updatePostHandler}>
                <i className="fa-solid fa-pencil"></i>
              </button>
              <i className="fa-solid fa-arrow-right" onClick={arrowHandler}></i>
            </div>
          </div>
          <h2>{post.id}</h2>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      )}
      {updatePost && (
        <form className="post-form">
          <i
            className="fa-solid fa-circle-xmark"
            onClick={updatePostHandler}
          ></i>
          <label name="title" htmlFor="title">
            title:
          </label>
          <input
            name="title"
            id="title"
            value={updateTitle || ""}
            onChange={(e) => setUpdateTitle(e.target.value)}
            type="text"
          />
          <br />
          <label name="body" htmlFor="body">
            post:
          </label>
          <textarea
            name="body"
            id="body"
            value={updateBody || ""}
            onChange={(e) => setUpdateBody(e.target.value)}
            type="text"
          />
          <button onClick={updatePostInDataBase}>save changes</button>
        </form>
      )}
      {viewComments && <ViewComments postId={postId} />}
    </>
  );
}

export default ViewPost;
