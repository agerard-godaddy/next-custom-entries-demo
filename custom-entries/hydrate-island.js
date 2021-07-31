import React from 'react';
import ReactDOM from 'react-dom';

export default function hydrateIsland(IslandComponent) {
  class Custom extends HTMLElement {
    connectedCallback() {
      const props = JSON.parse(this.getAttribute('data-props'));
      ReactDOM.hydrate(<IslandComponent.Component { ...props } />, this);
    }
  }

  customElements.define(IslandComponent.tagName, Custom);
}
