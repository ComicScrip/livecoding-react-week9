import React from 'react';
import { Route, Switch } from 'react-router';
import StudentsPage from './StudentsPage';

function Main() {
  return (
    <main>
      <Switch>
        <Route path="/" component={StudentsPage} />
      </Switch>
    </main>
  );
}
export default Main;
