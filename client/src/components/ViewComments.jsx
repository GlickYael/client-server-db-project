import React, { useEffect, useState, useRef } from "react";
import Error from "./Error";
import Loading from "./Loading";
import SingleComment from "./SingleComment";
import "./components_css/ViewComments.css";

function ViewComments({ postId }) {
  const URL_API = "http://localhost:3000";
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const updateTitle = useRef("");
  const updateBody = useRef("");
  const [addCommentButton, setAddCommentButton] = useState(false);
  const currentUserEmail = JSON.parse(localStorage.getItem("currentUser")).email;
  useEffect(() => {
    (async () => await fetchComments())();
  }, []);
  const fetchComments = async () => {
    try {
      const response = await fetch(`${URL_API}/posts/${postId}/comments`);
      if (!response.ok) {
        throw Error("Did not received expected data");
      }else{
      const result = await response.json();
      console.log(result);
      setCommentsList(result);
      }
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  function addComment() {
    setAddCommentButton(!addCommentButton);
  }
  const createCommentInDataBase = async (e) => {
    e.preventDefault();
    const newPost = {
      postId: postId,
      name: updateTitle.current,
      email: currentUserEmail,
      body: updateBody.current,
    };
    const response = await fetch(`${URL_API}/comments`, {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).catch((error) => {
      console.log("Error:", error);
    });
    const result = await response.json();
    console.log(result);
    setCommentsList((previousComments) => [...previousComments, result]);
    setAddCommentButton(false);
  };
  return (
    <div className="container">
      {isLoading && <Loading />}
      {fetchError && <Error message={fetchError} />}
      <button className="add-btn" onClick={addComment}>
        add comment <i className="fa-solid fa-plus"></i>
      </button>
      {addCommentButton && (
        <form>
          <label name="name" htmlFor="name">
            <i className="fa-solid fa-circle-xmark" onClick={addComment}></i>
            name:
          </label>
          <input
            name="name"
            id="name"
            onChange={(e) => (updateTitle.current = e.target.value)}
            type="text"
          />
          <br />
          <label name="body" htmlFor="body">
            comment:
          </label>
          <input
            name="body"
            id="body"
            onChange={(e) => (updateBody.current = e.target.value)}
          />
          <button className="save-btn" onClick={createCommentInDataBase}>
            save changes
          </button>
        </form>
      )}
      {!isLoading &&
        !fetchError &&
        commentsList.map((currentComment, key) => {
          return (
            <SingleComment
              className=""
              key={currentComment.id}
              comment={currentComment}
              setCommentsList={setCommentsList}
              commentsList={commentsList}/>
          );
        }
        )}
    </div>
  );
}

export default ViewComments;
