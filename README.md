<p align="center"><img src="https://blog.strapi.io/content/images/2017/10/logo.png" width="318px" /></p>
<h3 align="center">API creation made simple, secure and fast.</h3>
<p align="center">The most advanced open-source Content Management Framework to build powerful API with no effort.</p>
<br />
<p align="center">
  <a href="https://www.npmjs.org/package/strapi">
    <img src="https://img.shields.io/npm/v/strapi.svg" alt="Dependency Status" />
  </a>
  <a href="https://www.npmjs.org/package/strapi">
    <img src="https://img.shields.io/npm/dm/strapi.svg" alt="Dependency Status" />
  </a>
  <a href="https://travis-ci.org/strapi/strapi">
    <img src="https://travis-ci.org/strapi/strapi.svg?branch=master" alt="Dependency Status" />
  </a>
  <a href="http://slack.strapi.io">
    <img src="http://strapi-slack.herokuapp.com/badge.svg" alt="Dependency Status" />
  </a>
</p>

<br>

<p align="center"><img src="https://i.imgur.com/IgCBqxG.gif" /></p>



<br>

## Quick start

Read more from here https://medium.com/@ceddybi/strapi-rocks-d887c758831e

## Concepts
Your api's model should include the type_render and type_mongo, something like this
<img width="383" alt="screen shot 2018-02-15 at 3 51 48 pm" src="https://user-images.githubusercontent.com/14908307/36259850-3257841a-1268-11e8-9d3c-0bd62b12debc.png">

## Components
Custom components will appear when you're creating a new item from the content type manager, when describing the `type_render` keep in mind the following.

- `wysiwyg` = A simple WYSWYG editor
- `single-image` = A single image upload
- `multi-image` = Multiple images update with a *set primary feature*
- `location` = a Google maps location picker
- e.t.c.... you can browser the [custom-components folder](https://github.com/Radrw/strapi-pro/tree/master/packages/strapi-helper-plugin/lib/src/components/custom-components) to get all the custom components

#### NOTE: All these components save data as string.

About image upload, it receives the image file, uploads it to the cloud, then the cloud returns a url link to it, which is used for preview and saving in the database.


## Support

For more information on the upcoming version, please take a look to our [ROADMAP](ROADMAP.md).

### Community support

For general help using Strapi, please refer to [the official Strapi documentation](https://strapi.io/documentation/). For additional help, you can use one of this channel to ask question:

- [StackOverflow](http://stackoverflow.com/questions/tagged/strapi)
- [Slack](http://slack.strapi.io) (highly recommended for realtime support)
- [GitHub](https://github.com/strapi/strapi)
- [Twitter](https://twitter.com/strapijs)
- [Facebook](https://www.facebook.com/Strapi-616063331867161).

### Professional support

[Strapi Solutions](https://strapi.io), the company behind Strapi, provides a full range of solutions to get better results, faster. We're always looking for the next challenge: coaching, consulting, training, customization, etc. [Drop us an email](mailto:support@strapi.io) to see how we can help you.


## License

[MIT License](LICENSE.md) Copyright (c) 2015-2018 [Strapi Solutions](https://strapi.io/).
