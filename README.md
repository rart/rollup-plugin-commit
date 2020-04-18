# rollup-plugin-commit
[![npm version](https://badge.fury.io/js/rollup-plugin-commit.svg)](https://badge.fury.io/js/rollup-plugin-commit)

Super simple plugin to commit files to git after the rollup build is done.

```js
  import commit from 'rollup-plugin-commit';
  ...
  plugins: [
    babel({ ... }),
    resolve({ ... }),
    commonjs({ ... }),
    commit({
      // The text to use in the commit message
      message: 'Updates to {file} @ {date} {time}',
      // These paths are passed to the git add/commit commands literally
      targets: [
        // git add ./build/index.html && git commit ./build/index.html -m "..."
        './build/index.html',  
        // git add ./build/index.umd.js && git commit ./build/index.umd.js -m "..."
        './build/index.umd.js'
      ]
    })
  ]
  ...
```
