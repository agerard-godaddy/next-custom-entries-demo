import React from 'react';
import Nav from '../../components/nav';
import { ExampleButton, IslandExampleButton } from '../../components/example-button';

export const PageDynamic = () => (
  <div style={ { textAlign: 'center' } }>
    <h1>Page Dynamic</h1>
    <p>
      <ExampleButton color="aqua" text="World" message="Hello World!"/>
    </p>
    <p>
      <IslandExampleButton color="salmon" text="Mars" message="Hello Mars!"/>
    </p>

    <h2>Web Components (No Webpack)</h2>
    <p>
      Demonstrates custom entries for nested and dynamic routes.
      Mars is interactive via web components.
      The JavaScript file is loaded directly (no Webpack).
    </p>

    <Nav active='/deep/dynamic'/>
  </div>
);

export default PageDynamic;
