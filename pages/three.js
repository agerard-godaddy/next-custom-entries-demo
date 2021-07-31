import React from 'react';
import Nav from '../components/nav';
import { ExampleButton, IslandExampleButton } from '../components/example-button';

const PageThree = () => (
  <div style={ { textAlign: 'center' } }>
    <h1>Page Three</h1>
    <p>
      <ExampleButton color='aqua' text='World' message='Hello World!'/>
    </p>
    <p>
      <IslandExampleButton color='salmon' text='Mars' message='Hello Mars!'/>
    </p>

    <h2>Web Components</h2>
    <p>
      This example does not use React. Mars is interactive via web components.
    </p>

    <Nav active='/three'/>
  </div>
);

export default PageThree;
