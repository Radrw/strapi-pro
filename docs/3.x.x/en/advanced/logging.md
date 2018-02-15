# Logging

Strapi relies on an extremely fast Node.js logger called Pino that includes a shell utility to pretty-print its log files. It provides great performances and doesn't slow down your app. The logger is accessible through the global variable `strapi.log` or the request's context `ctx.log` if enabled.

```js
// Folder.js controller
const fs = require('fs');
const path = require('path');

module.exports = {

  /**
   * Retrieve app's folders.
   *
   * @return {Object|Array}
   */

  findFolders: async (ctx) => {
    try {
      const folders = fs.readdirSync(path.resolve(process.cwd()));

      strapi.log.info(folders); // ctx.log.info(folders);

      ctx.send(folders);
    } catch (error) {
      strapi.log.fatal(error); // ctx.log.fatal(error);
      ctx.badImplementation(error.message);
    }
  }
}
```

## Configuration

To configure the logger, you have to edit the following file `./config/environments/*/request.json`.


```json
{
  ...
  "logger": {
    "level": "debug",
    "exposeInContext": true,
    "requests": true
  },
  ...
}
```

- `level`: defines the desired logging level (fatal, error, warn, info, debug, trace).
- `exposeInContext`: allows access to the logger through the context.
- `requests`: incoming HTTP requests will be logged.


To find more details about the logger API, please refer to the [Pino documentation](http://getpino.io/#/).
