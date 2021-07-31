This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This app demonstrates the use of custom entries and scripts to reduce the
runtime JavaScript needed for high-content pages with low interactivity.

## Getting Started

Custom entries do not work with hot-reload. To run the app with custom entries
enabled:

```bash
npm run build
npm run start
```

Hot reload does still work with the app during the development stages:

```bash
npm run dev
```

### See it work

On the various pages, with the Network tab open, perform a reload to notice the
reduced JavaScript resources download, and resulting button interactivity.

## webpackFinal

Today, we cannot fully experiment with Webpack configuration because of Next.js
internals. On install, this app monkey-patches Next.js to introduce a
`webpackFinal` config method, allowing us to experiment with the _final_ Webpack
config.

A proposal has been submitted to Next.js for this to be a resident feature:
Original [Pull Request](https://github.com/vercel/next.js/pull/27544) moved to
~~[Issue](https://github.com/vercel/next.js/issues/27569)~~
[Discussion](https://github.com/vercel/next.js/discussions/27587)
