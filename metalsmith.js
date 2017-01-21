const Metalsmith        = require('metalsmith');
const argv              = require('minimist')(process.argv.slice(2));
const pkg               = require('./package.json');
const loadPlugins       = require('./load-plugins');

const extlink = require('remarkable-extlink');
const classy  = require('remarkable-classy');

const $ = loadPlugins(pkg, 'devDependencies', 'metalsmith-');

// Site Variables.
const sitename = 'Bobrov Blog';
const facebookAppId = 393821434298248;

// Content variables.
const pagesPattern = 'pages/*.md';
const postsPattern = 'blog/**/*.md';

const runMetalsmithBuild = url => {
  const siteurl = url || 'https://vitaliy-bobrov.github.io/';

  Metalsmith(__dirname)
    .metadata({
      locale: 'en',
      sitename,
      siteurl,
      facebookAppId,
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
    .use($.updated({
      updatedFile: '../service-files/.updated.json'
    }))
    .use($.defaultValues([
      {
        pattern : pagesPattern,
        defaults: {
          layout: 'page.html',
        }
      },
      {
        pattern : postsPattern,
        defaults: {
          draft: false,
          author: 'me',
          comments: true,
          twitter: true
        }
      }
    ]))
    .use($.drafts())
    .use($.collections({
      pages: {
        pattern: pagesPattern
      },
      posts: {
        pattern: postsPattern,
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
          linkedin: 'https://www.linkedin.com/in/vitaliybobrov',
          facebook: 'https://www.facebook.com/bobrov1989'
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
    .use($.markdownRemarkable({
        typographer: true
      })
      .use(classy)
      .use(extlink, {
        host: siteurl
      }))
    .use($.codeHighlight({
      tabReplace: '  ',
      languages: ['js', 'html', 'css']
    }))
    .use($.permalinks({
      relative: false,
      linksets: [
        {
          match: {
            collection: 'pages'
          },
          pattern: ':title'
        }
      ]
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
};

runMetalsmithBuild(argv.url);
