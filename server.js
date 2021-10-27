#!/usr/bin/env node

const fs = require('fs');
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');

const bundleRenderer = createBundleRenderer(
  // Load SSR bundle with require
  require('./dist/vue-ssr-bundle.json'),
  {
    // readFileSync is bad practice but shorter here
    template: fs.readFileSync('./index.html', 'utf-8')
  }
);

// Creates express app
const app = express();

// Serve static assets on and from ./dist
app.use('/dist', express.static('dist'));

// Render all other routes with bundleRenderer
app.get('*', (req, res) => {
  bundleRenderer
    // Renders directly to the response stream
    // Argument gets passed as "context" to main.server.js in the SSR bundle
    .renderToStream({url: req.path})
    .pipe(res);
});

// Bind the app to this port
app.listen(8080);