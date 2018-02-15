# Configurations

The main configurations of the project are located in the `./config` directory. Additional configs can be added in the `./api/**/config` folder of each APIs and plugins by creating JavaScript or JSON files.

## Application

Contains the main configurations relative to your project.

**Path —** `./config/application.json`.
```json
{
  "favicon": {
    "path": "favicon.ico",
    "maxAge": 86400000
  },
  "public": {
    "path": "./public",
    "maxAge": 60000
  }
}
```

 - `favicon`
   - `path` (string): Path to the favicon file. Default value: `favicon.ico`.
   - `maxAge` (integer): Cache-control max-age directive in ms. Default value: `86400000`.
 - `public`
   - `path` (string): Path to the public folder. Default value: `./public`.
   - `maxAge` (integer): Cache-control max-age directive in ms. Default value: `60000`.

***

## Custom

Add custom configurations to the project. The content of this file is available through the `strapi.config` object.

#### Example

**Path —** `./config/custom.json`.
```json
{
  "backendURL": "http://www.strapi.io",
  "mainColor": "blue"
}
```

These configurations are accessible through `strapi.config.backendURL` and `strapi.config.mainColor`.

***

## Language

As described in the [i18n documentation](../plugin-development/frontend-development.md#i18n), Strapi includes an internationalization system. This is especially useful to translate API messages (errors, etc.).

**Path —** `./config/language.json`.
```json
{
  "enabled": true,
  "defaultLocale": "en_us",
  "modes": [
    "query",
    "subdomain",
    "cookie",
    "header",
    "url",
    "tld"
  ],
  "cookieName": "locale"
}
```

 - `enabled` (boolean): Enable or disable i18n. Default value: `true`.
 - `defaultLocale` (string): Default locale used by the application. Default value: `en_us`.
 - `modes` (array): Methods used to detect client language. Default value: `["query", "subdomain", "cookie", "header", "url", "tld"]`.
 - `cookieName` (string): Name of the cookie used to store the locale name. Default value: `locale`.

***

## Functions

The `./config/functions/` folder contains a set of JavaScript files in order to add dynamic and logic based configurations.

### Bootstrap

**Path —** `./config/functions/bootstrap.js`.

The `bootstrap` function is called at every server start. You can use it to add a specific logic at this moment of your server's lifecycle.

Here are some use cases:

- Create an admin user if there isn't.
- Fill the database with some necessary data.
- Check that the database is up-and-running.

### CRON tasks

CRON tasks allow you to schedule jobs (arbitrary functions) for execution at specific dates, with optional recurrence rules. It only uses a single timer at any given time (rather than reevaluating upcoming jobs every second/minute).

> Note: Make sure the `enabled` cron config is set to `true` in your environment's variables.

The cron format consists of:

```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    |
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

To define a CRON job, add your logic like bellow:

**Path —** `./config/functions/cron.js`.
```js
module.exports = {

  /**
   * Simple example.
   * Every monday at 1am.
   */

  '0 0 1 * * 1': () => {
    // Add your own logic here (eg. send a queue of email, create a database backup, etc.).
  }
};
```

***

## Locales

The `locales` directory contains the translations of your API.

Each JSON file located in the folder must have the name of its corresponding translation (eg. `en_US.json`, `fr_FR.json`, etc.). Each line defines a translation key and its corresponding value.

#### Example

**Path —** `./config/locales/en_US.json`.
```js
{
  "welcome": "Welcome"
}
```

> Take a look at the [internationalization's guide](../guides/i18n.md) for more details.

***

## Environments

Most of the application's configurations are defined by environment. It means that you can specify settings for each environment (`development`, `production`, `test`, etc.).

> Note: You can access to the config of the current environment through `strapi.config.currentEnvironment`.

***

## Database

**Path —** `./config/environments/**/database.json`.

 - `defaultConnection` (string): Connection by default for models which are not related to a specific `connection`. Default value: `default`.
 - `connections` List of all available connections.
   - `default`
     - `connector` (string): Connector used by the current connection. Default value: `strapi-mongoose`.
     - `client` (string): Client used to store session. Default value: `cookie`.
     - `key` (string): Cookie key name. Default value: `strapi.sid`
     - `maxAge` (integer): Time in milliseconds before the session expire. Default value: `86400000`.
     - `rolling` (boolean): Force a session identifier cookie to be set on every response. Default value: `false`.
     - `signed` (boolean): httpOnly or not. Default value: `true`.
     - `overwrite` (boolean): Can overwrite or not. Default value: `true`.
     - `settings` Useful for external session stores such as Redis.
       - `host` (string): Database host name. Default value: `localhost`.
       - `port` (integer): Database port. Default value: `27017`.
       - `database` (string): Database name. Default value: `development`.
       - `username` (string): Username used to establish the connection.
       - `password` (string): Password used to establish the connection.
       - `options` (object): List of additional options used by the connector.

#### Example

**Path —** `./config/environments/**/database.json`.
```json
{
  "defaultConnection": "default",
  "connections": {
    "default": {
      "connector": "strapi-mongoose",
      "settings": {
        "client": "mongo",
        "host": "localhost",
        "port": 27017,
        "database": "development",
        "username": "fooUsername",
        "password": "fooPwd"
      },
      "options": {}
    },
    "postgres": {
      "connector": "strapi-bookshelf",
      "settings": {
        "client": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "aureliengeorget",
        "password": "${process.env.USERNAME}",
        "database": "${process.env.PWD}",
        "schema": "public"
      },
      "options": {}
    },
    "mysql": {
      "connector": "strapi-bookshelf",
      "settings": {
        "client": "mysql",
        "host": "localhost",
        "port": 5432,
        "username": "aureliengeorget",
        "password": "root",
        "database": ""
      },
      "options": {}
    },
    "redis": {
      "connector": "strapi-redis",
      "settings": {
        "port": 6379,
        "host": "localhost",
        "password": ""
      },
      "options": {
        "debug": false
      }
    }
  }
}
```

> Please refer to the [dynamic configurations section](#dynamic-configurations) to use global environment variable to configure the databases.

***

## Request

**Path —** `./config/environments/**/request.json`.

 - `session`
   - `enabled` (boolean): Enable or disable sessions. Default value: `false`.
   - `client` (string): Client used to persist sessions. Default value: `redis`.
   - `settings`
     - `host` (string): Client host name. Default value: `localhost`.
     - `port` (integer): Client port. Default value: `6379`.
     - `database`(integer)|String - Client database name. Default value: `10`.
     - `password` (string): Client password. Default value: ` `.
 - `logger`
   - `level` (string): Default log level. Default value: `debug`.
   - `exposeInContext` (boolean): Expose logger in context so it can be used through `strapi.log.info(‘my log’)`. Default value: `true`.
   - `requests` (boolean): Enable or disable requests logs. Default value: `false`.
 - `parser`
  - `enabled`(boolean): Enable or disable parser. Default value: `true`.
  - `multipart` (boolean): Enable or disable multipart bodies parsing. Default value: `true`.
 - `router`
  - `prefix` (string): API url prefix (eg. `/v1`).

> Note: The session doesn't work with `mongo` as a client. The package that we should use is broken for now.

***

## Response

**Path —** `./config/environments/**/response.json`.

 - [`gzip`](https://en.wikipedia.org/wiki/Gzip)
  - `enabled` (boolean): Enable or not GZIP response compression.
 - `responseTime`
  - `enabled` (boolean): Enable or not `X-Response-Time header` to response. Default value: `false`.

***

## Security

**Path —** `./config/environments/**/security.json`.

 - [`csrf`](https://en.wikipedia.org/wiki/Cross-site_request_forgery)
   - `enabled` (boolean): Enable or disable CSRF. Default value: depends on the environment.
   - `key` (string): The name of the CSRF token added to the model. Default value: `_csrf`.
   - `secret` (string): The key to place on the session object which maps to the server side token. Default value: `_csrfSecret`.
 - [`csp`](https://en.wikipedia.org/wiki/Content_Security_Policy)
   - `enabled` (boolean): Enable or disable CSP to avoid Cross Site Scripting (XSS) and data injection attacks.
 - [`p3p`](https://en.wikipedia.org/wiki/P3P)
  - `enabled` (boolean): Enable or disable p3p.
 - [`hsts`](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)
  - `enabled` (boolean): Enable or disable HSTS.
  - `maxAge` (integer): Number of seconds HSTS is in effect. Default value: `31536000`.
  - `includeSubDomains` (boolean): Applies HSTS to all subdomains of the host. Default value: `true`.
 - [`xframe`](https://en.wikipedia.org/wiki/Clickjacking)
   - `enabled` (boolean): Enable or disable `X-FRAME-OPTIONS` headers in response.
   - `value` (string): The value for the header, e.g. DENY, SAMEORIGIN or ALLOW-FROM uri. Default value: `SAMEORIGIN`.
 - [`xss`](https://en.wikipedia.org/wiki/Cross-site_scripting)
  - `enabled` (boolean): Enable or disable XSS to prevent Cross Site Scripting (XSS) attacks in older IE browsers (IE8).
 - [`cors`](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
  - `enabled` (boolean): Enable or disable CORS to prevent your server to be requested from another domain.
  - `origin` (string): Allowed URLs (`http://example1.com, http://example2.com` or allows everyone `*`). Default value: `http://localhost`.
  - `expose` (array): Configures the `Access-Control-Expose-Headers` CORS header. If not specified, no custom headers are exposed. Default value: `["WWW-Authenticate", "Server-Authorization"]`.
   - `maxAge` (integer): Configures the `Access-Control-Max-Age` CORS header. Default value: `31536000`.
   - `credentials` (boolean): Configures the `Access-Control-Allow-Credentials` CORS header. Default value: `true`.
   - `methods` (array)|String - Configures the `Access-Control-Allow-Methods` CORS header. Default value: `["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"]`.
   - `headers` (array): Configures the `Access-Control-Allow-Headers` CORS header. If not specified, defaults to reflecting the headers specified in the request's Access-Control-Request-Headers header. Default value: `["Content-Type", "Authorization", "X-Frame-Options"]`.
 - `ip`
   - `enabled` (boolean): Enable or disable IP blocker. Default value: `false`.
   - `whiteList` (array): Whitelisted IPs. Default value: `[]`.
   - `blackList` (array): Blacklisted IPs. Default value: `[]`.

***

## Server

**Path —** `./config/environments/**/server.json`.

 - `host` (string): Host name. Default value: `localhost`.
 - `port` (integer): Port on which the server should be running. Default value: `1337`.
 - `autoReload` (boolean): Enable or disabled server reload on files update. Default value: depends on the environment.
 - [`cron`](https://en.wikipedia.org/wiki/Cron)
  - `enabled` (boolean): Enable or disable CRON tasks to schedule jobs at specific dates. Default value: `false`.
 - `admin`
  - `path` (string): Allow to change the URL to access the admin (default: `/admin`).
  - `build`
    - `host` (string): URL to access the admin panel (default: `http://localhost:1337/admin`).
    - `backend` (string): URL that the admin panel and plugins will request (default: `http://localhost:1337`).
      - `plugins`
        - `source` (string): Define the source mode (origin, host, custom).
        - `folder` (string): Indicate what the plugins folder in `host` source mode.

***

## Dynamic configurations

For security reasons, sometimes it's better to set variables through the server environment. It's also useful to push dynamics values into configurations files. To enable this feature into JSON files, Strapi embraces a JSON-file interpreter into his core to allow dynamic value in the JSON configurations files.

### Syntax

The syntax is inspired by the [template literals ES2015 specifications](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). These dynamic values are indicated by the Dollar sign and curly braces (`${expression}`).

#### Usage

In any JSON configurations files in your project, you can inject dynamic values like this:

**Path —** `./config/environments/production/database.json`.
```json
{
  "defaultConnection": "default",
  "connections": {
    "default": {
      "connector": "strapi-mongoose",
      "settings": {
        "client": "mongo",
        "uri": "${process.env.DATABASE_URI || ''}",
        "host": "${process.env.DATABASE_HOST || '127.0.0.1'}",
        "port": "${process.env.DATABASE_PORT || 27017}",
        "database": "${process.env.DATABASE_NAME || 'production'}",
        "username": "${process.env.DATABASE_USERNAME || ''}",
        "password": "${process.env.DATABASE_PASSWORD || ''}"
      },
      "options": {}
    }
  }
}
```

> Note: You can't execute functions inside the curly braces. Only strings are allowed.

***

## Database configuration

Configuration files are not multi server friendly. So we create a data store for config you will want to update in production.

#### Usage

## Get settings:

- `environment` (string): Sets the environment you want to store the data in. By default it's current environment (can be an empty string if your config is environment agnostic).
- `type` (string): Sets if your config is for an `api`, `plugin` or `core`. By default it's `core`.
- `name` (string): You have to set the plugin or api name if `type` is `api` or `plugin`.
- `key` (string, required): The name of the key you want to store.

```
// strapi.store(object).get(object);

// create reusable plugin store variable
const pluginStore = strapi.store({
  environment: strapi.config.environment,
  type: 'plugin',
  name: 'users-permissions'
});

await pluginStore.get({key: 'grant'});
```

## Set settings:

 - `value` (any, required): The value you want to store.

 ```
 // strapi.store(object).set(object);

 // create reusable plugin store variable
 const pluginStore = strapi.store({
   environment: strapi.config.environment,
   type: 'plugin',
   name: 'users-permissions'
 });

 await pluginStore.set({
   key: 'grant',
   value: {
     ...
   }
});
 ```
