import React from 'react';
import Nav from '../components/nav';
import { ExampleButton, IslandExampleButton } from '../components/example-button';

const PageOne = () => (
  <div style={ { textAlign: 'center' } }>
    <h1>Page One</h1>
    <p>
      <ExampleButton color='aqua' text='World' message='Hello World!'/>
    </p>
    <p>
      <IslandExampleButton color='salmon' text='Mars' message='Hello Mars!'/>
    </p>

    <h2>Standard</h2>
    <p>
      This is a standard Next page with no custom entries.
      If navigating to other pages, the will be rendered as SPA and both buttons interactive.
    </p>
    <p>
      To see custom entry behavior, do a reload on the different pages.
      Compare total resources downloaded to this page.
    </p>

    <Nav active='/one'/>
  </div>
);

export default PageOne;
