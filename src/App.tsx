import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/layout/Layout';
import AllQuotesPage from './pages/AllQuotesPage';
import NewQuotePage from './pages/NewQuotePage';
import NotFoundPage from './pages/NotFoundPage';
import QuoteDetailPage from './pages/QuoteDetailPage';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotesPage />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetailPage />
        </Route>
        <Route path="/new-quote">
          <NewQuotePage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
