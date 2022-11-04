import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

type Props = {
  comments: { id: string; text: string }[];
};

const CommentsList = (props: Props) => {
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </ul>
  );
};

export default CommentsList;
