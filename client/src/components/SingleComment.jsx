import React, { useState } from "react";
import Error from "./Error";

function SingleComment({
  comment,
  setCommentsList,
  commentsList,
}) {
  const URL_API = "http://localhost:3000";
  const [updateComment, setUpdateComment] = useState(false);
  const [updateTitle, setUpdateTitle] = useState();
  const [updateBody, setUpdateBody] = useState(); 
   const currentUserEmail=JSON.parse(localStorage.getItem("currentUser")).email;

  const [fetchError, setFetchError] = useState(null);
  function updateCommentHandler() {
    setUpdateComment(!updateComment);
  }

  const updateCommentInDataBase = async () => {
    setUpdateComment(false);

    const updatedData = {
      postId: comment.postId,
      id: comment.id,
      name: updateTitle,
      email: comment.email,
      body: updateBody,
    };
    const updatedCommentList = commentsList.map((currentComment) =>
      currentComment.id == comment.id ? updatedData : currentComment
    );

    try {
      const response = await fetch(`${URL_API}/comments/${comment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw Error("Did not delete task");
      } else {
        setCommentsList(updatedCommentList);
      }
    } catch (err) {
      setFetchError(err);
    }
  };

  const deleteComment = async () => {
    const updatedCommentList = commentsList.filter(
      (currentComment) => currentComment.id != comment.id
    );
    try {
      const respons = await fetch(`${URL_API}/comments/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (!respons.ok) {
        throw Error("Did not delete task");
      } else {
        setCommentsList(updatedCommentList);
      }
    } catch (err) {
      console.log("Erorr:", err);
    }
  };
  return (
    <div className="comment-item ">
      {fetchError && <Error err={fetchError} />}
      {!fetchError && (
        <>
          {comment.email}
          <br />
          {comment.name}
          <br />
          {comment.body}
          {comment.email == currentUserEmail && (
            <>
              <button onClick={deleteComment}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
              <button onClick={updateCommentHandler}>
                <i className="fa-solid fa-pencil"></i>
              </button>
            </>
          )}
          {updateComment && (
            <form className="post-form">
              <i
                className="fa-solid fa-circle-xmark"
                onClick={updateCommentHandler}
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
                comment:
              </label>
              <textarea
                name="body"
                id="body"
                value={updateBody || ""}
                onChange={(e) => setUpdateBody(e.target.value)}
                type="text"
              />
              <button onClick={updateCommentInDataBase}>save changes</button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default SingleComment;
