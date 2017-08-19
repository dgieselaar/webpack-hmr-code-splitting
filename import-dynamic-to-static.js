/*
  This plugin hoists dynamic imports to static imports,
  and replaces dynamic import statements with immediately
  resolved promises. This is to ensure hot-reloading works
  out of the box with a code-split architecture.
*/

const IMPORTS_TO_ADD = 'importsToAdd';
module.exports = () => ({
  visitor: {
    Program: {
      enter: (path, { file }) => {
        file.set(IMPORTS_TO_ADD, []);
      },
      exit: (path, { file }) => {
        const imports = file.get(IMPORTS_TO_ADD).concat().reverse();
        imports.forEach((imp) => {
          const identifier = file.addImport(imp.moduleName, 'default');
          imp.path.parentPath.replaceWithSourceString(`Promise.resolve(${identifier.name})`);
        });
      },
    },
    Import: {
      enter: (path, { file }) => {
        const moduleName = path.container.arguments[0].extra.rawValue;

        const importsToAdd = file.get(IMPORTS_TO_ADD);

        if (importsToAdd.filter(imp => imp.moduleName === moduleName).length === 0) {
          file.set(IMPORTS_TO_ADD, importsToAdd.concat({
            moduleName,
            path,
          }));
        }
      },
    },
  },
});
