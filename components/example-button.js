import { island } from './island';

export function ExampleButton(props) {
  return <button onClick={() => alert(props.message) } style={ { background: props.color } }>
    { props.text }
  </button>
}

export const IslandExampleButton = island(ExampleButton, 'example-btn');
