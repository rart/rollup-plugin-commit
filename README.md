# rollup-plugin-commit

Super simple plugin to commit files to git after the rollup build is done.

```js
  rollupPluginCommit({
    message: 'Updates to {file} @ {date} {time}',
    targets: [
      './build/index.html',
      './build/index.umd.js'
    ]
  })
```