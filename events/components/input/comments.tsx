import { PropsWithChildren, useCallback, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import {  postEventCommentAddMutation } from '../../helpers/fetch-utils';
import { useNotificationContext } from '../../store/notification_context';

interface Props  extends PropsWithChildren{
  eventId: string
}

const Comments = (props: Props) => {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);
  const {showNotification} = useNotificationContext()

  const onError = useCallback((e:Error)=>{
    showNotification({title:`Commenting on ${eventId}`, status:'error', message:e.message})
  },[showNotification])

  const onSuccess = useCallback(()=>{
    showNotification({title:`Commenting on ${eventId}`, status:'success', message:`This comment was added successfuly!`})
  },[showNotification])

  const {postComment, error, isSuccess, isLoading, data,} = postEventCommentAddMutation(onSuccess, onError)

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    commentData = {...commentData, eventId}
    postComment(commentData)
   
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={(commentData)=>addCommentHandler(commentData)}/>}
      {(showComments && !isLoading) && <CommentList eventId={eventId} hasNewComments={!isLoading}/>}
      {isLoading && <p>Loading comments...</p>}
    </section>
  );
}

export default Comments;
