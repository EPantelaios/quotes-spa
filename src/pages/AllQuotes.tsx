import QuoteList from '../components/quotes/QuoteList';

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

const AllQuotes = () => {
  return <QuoteList quotes={EXAMPLE_QUOTES} />;
};

export default AllQuotes;
