class IslandExampleButton extends HTMLElement {
  connectedCallback() {
    const props = JSON.parse(this.getAttribute('data-props'));
    this.firstChild.onclick = () => alert(props.message);
  }
}

customElements.define('example-btn', IslandExampleButton);
