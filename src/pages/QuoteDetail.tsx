import { useParams, Route } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const EXAMPLE_QUOTES = [
  {
    id: 'q1',
    author: 'John',
    text: 'Do not believe everything you read on the internet',
  },
  {
    id: 'q2',
    author: 'Mike',
    text: 'Practice react-router-dom library is cool.',
  },
];

const QuoteDetail = () => {
  const params = useParams<{ quoteId: string }>();

  const quote = EXAMPLE_QUOTES.find((quote) => quote.id === params.quoteId);

  if (!quote) {
    return <p>No quote found!</p>;
  }

  return (
    <>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetail;
