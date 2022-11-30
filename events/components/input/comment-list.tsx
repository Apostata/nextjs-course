import { getAllCommentsByEventIdsWithReactQuery } from '../../helpers/fetch-utils';
import classes from './comment-list.module.css';

const CommentList =({eventId, hasNewComments}:{eventId:string, hasNewComments:boolean}) => {
  
  const {data, error, isLoading} = getAllCommentsByEventIdsWithReactQuery(eventId, hasNewComments)
  const comments = data
  console.log(eventId, comments)
  return (
    <>{comments?.length? <ul className={classes.comments}>
      {comments.map(comment=><li key={comment.id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name} - {comment.email}</address>
          </div>
        </li>
        )}
      </ul>:<p>No comments!</p>}
    </>
  );
}

export default CommentList;
