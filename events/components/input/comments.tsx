import { PropsWithChildren, useCallback, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { getAllCommentsByEventIdsWithReactQuery, postEventCommentAddMutation } from '../../helpers/fetch-utils';

interface Props  extends PropsWithChildren{
  eventId: string
}

const Comments = (props: Props) => {
  const { eventId } = props;
  const [showComments, setShowComments] = useState(false);

  const {postComment, error, isSuccess, isLoading, data,} = postEventCommentAddMutation()

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
      {showComments && <CommentList eventId={eventId} hasNewComments={!isLoading}/>}
    </section>
  );
}

export default Comments;
