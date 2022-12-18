import { useState, useEffect, useContext } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import NotificationContext from '../../store/notification-context'
import classes from './comments.module.css'

function Comments(props) {
  const { eventId } = props

  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const notificationCtx = useContext(NotificationContext)

  useEffect( () => {
    if (showComments) {
      setIsLoading(true)
      fetch(`/api/comments/${eventId}`)
        .then(res => res.json())
        .then(data => {
          setIsLoading(false)
          setComments(data.comments)
        })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus)
  }

  function addCommentHandler(commentData) {

    notificationCtx.showNotification({
      title: 'Adding comment...',
      message: 'Your comment is currently beind stored into a database.',
      status: 'pending'
    })
    
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        return res.json().then(data => {
          throw new Error(data.message || 'Something went wrong...')
        })
      })
      .then(data => {
        notificationCtx.showNotification({
          title: 'Success!',
          message: 'Your comment was successfully added.',
          status: 'success'
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong...',
          status: 'error'
        })
      })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {isLoading && <p>Loading...</p>}
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  );
}

export default Comments
