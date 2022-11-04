import QuoteForm from '../components/quotes/QuoteForm';

type QuoteDataProps = {
  author: string;
  text: string;
};

const NewQuote = () => {
  const addQuoteHandler = (quoteData: QuoteDataProps) => {
    console.log(quoteData);
  };

  return <QuoteForm onAddQuote={addQuoteHandler} isLoading={false} />;
};

export default NewQuote;
