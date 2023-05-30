import React, { useState, useEffect } from "react";

export const Comments = ({ ListOfComments }) => {
  const [id, setId] = useState("");
  function deleteComment(id) {
    fetch("/delete" + id, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        // setId(id);
        console.log("Success");
      });
    });
  }
  // useEffect(() => {
  //   deleteComment(id);
  // });
  return (
    <>
      {ListOfComments.map((comment) => {
        return (
          <ul>
            <li>
              {comment.comment}
              <button onClick={() => deleteComment(comment.id)}>Delete</button>
              <input type="text" name="rating" />
              <button onClick={console.log("click")}>Submit</button>
            </li>
          </ul>
        );
      })}
    </>
  );
};
