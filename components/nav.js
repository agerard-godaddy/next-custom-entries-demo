import React from 'react';
import Link from 'next/link';

const pages = {
  '/one': 'Page One - Standard',
  '/two': 'Page Two - Island Hydration',
  '/three': 'Page Three - Web Components',
  '/four': 'Page Four - Web Components (No Webpack)',
  '/five': 'Page Five - Lazy Island Hydration',
  '/deep/dynamic': 'Dynamic Page - Web Components (No Webpack)'
};

export default function Nav({ active }) {
  return <>
    <h4>Pages</h4>
    <ul>
      {
        Object.entries(pages).map(([href, title], idx) => {
          if (href === active) {
            return <li key={ idx }>{ title }</li>;
          }
          return <li key={ idx }>
            <Link href={ href }>
              <a>{ `${ title }` }</a>
            </Link>
          </li>;
        })
      }
    </ul>
  </>;
}
