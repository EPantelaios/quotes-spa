import { useState, useRef } from 'react';

import { useLocation, Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

type Props = {
  isLoading: boolean;
  onAddQuote: (obj: { author: string; text: string }) => void;
};

const isEmpty = (value: string) => value?.trim() === '';

const QuoteForm = (props: Props) => {
  const [isEntering, setIsEntering] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  const authorInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const location = useLocation();
  console.log('location', location);

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredAuthor = authorInputRef.current?.value || '';
    const enteredText = textInputRef.current?.value || '';

    if (isEmpty(enteredAuthor) || isEmpty(enteredText)) {
      setIsFormValid(false);
      return;
    }

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formChangedHandler = () => {
    if (
      !authorInputRef.current?.value.length &&
      !textInputRef.current?.value.length
    ) {
      setIsEntering(false);
      return;
    }

    (authorInputRef.current?.value.length ||
      textInputRef.current?.value.length) &&
      setIsEntering(true);
  };

  return (
    <>
      <Prompt
        when={isEntering}
        message={() =>
          'Are you sure you want to leave? All your entered data will be lost!'
        }
      />
      <Card>
        <form
          className={classes.form}
          onChange={formChangedHandler}
          onSubmit={submitFormHandler}
          onFocus={() => setIsFormValid(true)}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="author">Author:</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Quote:</label>
            <textarea id="text" rows={5} ref={textInputRef}></textarea>
          </div>
          {!isFormValid && (
            <span className={classes.invalid}>
              <p>Please enter non-empty inputs!</p>
            </span>
          )}
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
