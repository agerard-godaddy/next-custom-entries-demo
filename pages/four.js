import React from 'react';
import Nav from '../components/nav';
import { ExampleButton, IslandExampleButton } from '../components/example-button';

const PageFour = () => (
  <div style={ { textAlign: 'center' } }>
    <h1>Page Four</h1>
    <p>
      <ExampleButton color="aqua" text="World" message="Hello World!"/>
    </p>
    <p>
      <IslandExampleButton color="salmon" text="Mars" message="Hello Mars!"/>
    </p>

    <h2>Web Components (No Webpack)</h2>
    <p>
      This example does not use React or Webpack.
      Mars is interactive via web components.
      The JavaScript file is loaded directly (no Webpack).
    </p>

    <Nav active="/four"/>
  </div>
);

export default PageFour;
