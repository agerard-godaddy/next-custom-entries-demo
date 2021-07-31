import React from 'react';
import Nav from '../components/nav';
import { ExampleButton, IslandExampleButton } from '../components/example-button';

const PageTwo = () => (
  <div style={ { textAlign: 'center' } }>
    <h1>Page Two</h1>
    <p>
      <ExampleButton color='aqua' text='World' message='Hello World!'/>
    </p>
    <p>
      <IslandExampleButton color='salmon' text='Mars' message='Hello Mars!'/>
    </p>

    <h2>Island Hydration</h2>
    <p>
      This example only hydrates the Mars button with a custom entry.
    </p>

    <Nav active='/two'/>
  </div>
);

export default PageTwo;
