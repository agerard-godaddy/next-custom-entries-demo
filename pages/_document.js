import Document from 'next/document';
import withCustomEntries from '../custom-entries/document-wrapper';

const pageConfigs = {
  '/two': {
    entry: 'react-islands'
  },
  '/three': {
    chunks: /webpack/,
    entry: 'no-react'
  },
  '/four': {
    script: '/no-webpack.js'
  },
  '/deep/[slug]': {
    script: '/no-webpack.js'
  }
}

export default withCustomEntries({ pageConfigs })(Document);
