import axios from 'axios'
import path from 'path'
import React, { Component } from 'react'
import { renderStaticOptimized } from 'glamor/server'
import * as fs from 'fs';
import marked from 'marked';

// Paths Aliases defined through tsconfig.json
const typescriptWebpackPaths = require('./webpack.config.js')

const buildRotues = (toc, prefix, book) => {
  const routes = toc.chapters.map((chapter, chapterIdx) => {
    return chapter.pages.map((page, pageIdx) => {
      const title = `${page.title} > ${chapter.title} > ${toc.title} > ${book} - Scotch Media Tutorials`;
      var data = fs.readFileSync(__dirname + `/md/${page.url}.md`, 'utf8');
      var url = page.url.split(`/tutorials${prefix}`)[1];
      const content = marked(data);
      return {
        path: `${prefix}${url}`,
        component: 'src/containers/TutorialDetail',
        getData: () => ({
          toc,
          title,
          content,
        }),
      };
    });
  });
  return [].concat.apply([], routes);
};

const expressToc = require('./md/tutorials/express/authentication/toc.json');
const expressRoutes = buildRotues(expressToc, '/express/authentication/', 'Express Auth');

const meteorToc = require('./md/tutorials/meteor/blog/toc.json');
const meteorRoutes = buildRotues(meteorToc, '/meteor/blog/', 'Meteor Blog');

const tutorialRoutes = () => {
  return [].concat.apply([], [expressRoutes, meteorRoutes]);
}

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getSiteData: () => ({
    title: 'Scotch Media',
    description: 'An interactive media studio, specialzing in user interface design, graphic design, iOS development, Android development and web development',
  }),
  siteRoot: 'https://www.scotchmedia.com',
  getRoutes: async () => {
    const { data: posts } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/tutorials',
        component: 'src/containers/TutorialIndex',
        getData: () => ({
          posts,
        }),
        children: tutorialRoutes(),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ];
  },
  renderToHtml: async (render, Comp, meta) => {
    const html = render(<Comp />)
    const { css } = renderStaticOptimized(() => html)
    meta.glamStyles = css
    return html
  },
  Document: class CustomDocument extends Component {
    render() {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Scotch Media" />
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

            <link rel="apple-touch-icon" href="/apple-icon.png" />
            <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
            <meta name="theme-color" content="#ffffff" />

            <style dangerouslySetInnerHTML={{ __html: renderMeta.glamStyles }} />
          </Head>
          <Body>
            {children}
          </Body>
        </Html>
      )
    }
  },
  webpack: (config, { defaultLoaders }) => {
    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push('.ts', '.tsx')

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    config.resolve.alias = typescriptWebpackPaths.resolve.alias

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
            use: [
              {
                loader: 'babel-loader',
              },
              {
                loader: require.resolve('ts-loader'),
                options: {
                  transpileOnly: true,
                },
              },
            ],
          },
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]
    return config
  },
}
