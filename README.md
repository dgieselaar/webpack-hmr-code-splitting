This repository shows how hot reloading is broken for React apps that use Webpack and code splitting, and a possible way to fix it.

It seems that it breaks because the module hot updates only propagate to the top level module once. After that, they're only propagated to the chunk the current module exists in. This means we don't have a way to know when to re-render in the index file.

To fix this issue, you can use a plugin that converts dynamic imports to static imports. This way hot updates always propagate to the index file.

The plugin (see `import-dynamic-to-static.js`) inspects all dynamic import statements, adds a static import to the file to the given module, and replaces the dynamic import statement with a Promise that immediately resolves with the module that was statically imported.

Here's how you can reproduce the issue:

- `$ npm install`
- `$ npm start`
- Click on the home button
- Change something in home.js
- See that HMR works the first time, and both the './home.js' and './app.js' modules are in the change list in the console
- Change something in home.js again
- Notice that the changes are not reflected in the UI and that only './home.js' in the list of updated modules

To fix it, simply add `./import-dynamic-to-static.js` to the plugins in `.babelrc`.

__Please note that this plugin should not be used in production, because it will break code splitting__.
