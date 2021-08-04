import React from 'react';
import Nav from '../components/nav';
import { ExampleButton, IslandExampleButton } from '../components/example-button';

const PageFive = () => (
  <div style={ { textAlign: 'center' } }>
    <h1>Page Five</h1>
    <p>
      <ExampleButton color="aqua" text="World" message="Hello World!"/>
    </p>
    <p>
      Scroll down to find the Mars button.
    </p>

    <h2>Lazy Island Hydration</h2>
    <p>
      This example only hydrates the Mars button when in view.
    </p>

    <Nav active="/five"/>
    <p style={{ paddingTop: 1000 }}>
      <IslandExampleButton color="salmon" text="Mars" message="Hello Mars!"/>
    </p>
  </div>
);

export default PageFive;
