import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';

type QuoteDataProps = {
  author: string;
  text: string;
};

const NewQuote = () => {
  const history = useHistory();

  const addQuoteHandler = (quoteData: QuoteDataProps) => {
    console.log(quoteData);
    history.push('/quotes');
  };

  return <QuoteForm onAddQuote={addQuoteHandler} isLoading={false} />;
};

export default NewQuote;
