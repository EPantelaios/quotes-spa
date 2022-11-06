import React, { Suspense } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const AllQuotesPage = React.lazy(() => import('./pages/AllQuotesPage'));
const QuoteDetailPage = React.lazy(() => import('./pages/QuoteDetailPage'));
const NewQuotePage = React.lazy(() => import('./pages/NewQuotePage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
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
      </Suspense>
    </Layout>
  );
}

export default App;
