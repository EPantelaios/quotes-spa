import { useState, useRef, useEffect } from 'react';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './NewCommentForm.module.css';

type Props = {
  quoteId: string;
  onAddedComment: () => void;
};

const NewCommentForm = (props: Props) => {
  const commentTextRef = useRef<HTMLTextAreaElement>(null);
  const [inputComment, setInputComment] = useState<string>('');

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredText = commentTextRef.current?.value;
    sendRequest({ commentData: { text: enteredText }, quoteId: props.quoteId });
    setInputComment('');
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          rows={5}
          ref={commentTextRef}
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
