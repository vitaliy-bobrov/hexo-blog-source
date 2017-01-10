const Metalsmith       = require('metalsmith');
const pkg              = require('./package.json');
const loadPlugins      = require('./load-plugins');

const $ = loadPlugins(pkg, 'devDependencies', 'metalsmith-');

// Site Variables.
const sitename = 'Bobrov Blog';
const siteurl = 'https://vitaliy-bobrov.github.io/';

Metalsmith(__dirname)
  .metadata({
    locale: 'en',
    sitename,
    siteurl,
    sitelogo: '/images/logo',
    siteogimg: 'images/blog-og.jpg',
    description: 'Blog about web development, but not only...',
    themeColor: '#00bcd4',
    generatorname: 'Metalsmith',
    generatorurl: 'http://metalsmith.io/'
  })
  .source('./source')
  .destination('./build')
  .clean(false)
  //.use($.updated())
  .use($.drafts())
  .use($.collections({
    pages: {
      pattern: 'pages/*.md'
    },
    posts: {
      pattern: 'blog/**/*.md',
      sortBy: 'created',
      reverse: true
    }
  }))
  .use($.author({
    collection: 'posts',
    authors: {
      me: {
        name: 'Vitaliy Bobrov',
        url: siteurl,
        avatar: '/images/authors/bobrov/avatar',
        github: 'https://github.com/vitaliy-bobrov',
        twitter: 'https://twitter.com/bobrov1989',
        linkedin: 'https://www.linkedin.com/in/vitaliybobrov'
      }
    }
  }))
  .use($.pagination({
    'collections.posts': {
      perPage: 8,
      layout: 'blog.html',
      first: 'index.html',
      noPageOne: true,
      path: 'blog/page/:num/index.html',
      pageMetadata: {}
    }
  }))
  .use($.headings('h2'))
  .use($.markdown())
  .use($.codeHighlight({
    tabReplace: '  ',
    languages: ['js', 'html', 'css']
  }))
  .use($.permalinks({
    relative: false
  }))
  .use($.excerpts())
  .use($.registerHelpers({
    directory: './helpers'
  }))
  .use($.layouts({
    engine: 'handlebars',
    default: 'post.html',
    partials: './partials'
  }))
  .use($.disqus({
    siteurl,
    shortname: 'bobrov-blog'
  }))
  .use($.openGraph({
    sitename,
    siteurl,
    title: 'ogtitle',
    description: 'ogdescr',
    image: 'ogimage',
    decodeEntities: false
  }))
  .use($.twitterCard({
    siteurl,
    card: 'summary_large_image',
    site: '@bobrov1989',
    title: 'title',
    description: 'description',
    'image:alt': 'title'
  }))
  .use($.mapsite({
    hostname: siteurl
  }))
  .build(function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('Metalsmith build completed')
    }
  });
