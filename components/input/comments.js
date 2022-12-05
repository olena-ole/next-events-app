import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([])

  function toggleCommentsHandler() {
    if (!showComments) {
      fetch(`/api/comments/${eventId}`)
        .then(res => res.json())
        .then(data => {
          setComments(data.comments)
          setShowComments((prevStatus) => !prevStatus)
        })
    } else {
      setShowComments((prevStatus) => !prevStatus);
    }
  }

  function addCommentHandler(commentData) {
    const { email, name, text } = commentData
    const newComment = {
      email: email,
      name: name,
      text: text
    }

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setComments(prev => [...prev, data.comment])
      })

    // send data to API
  }

  const commentElements = comments.length ? 
      <CommentList comments={comments}/> : 
      <p>Be the first to write a comment!</p>

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && commentElements}
    </section>
  );
}

export default Comments;
