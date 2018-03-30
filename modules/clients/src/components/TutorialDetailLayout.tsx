import Highlight from 'react-highlight';
import React from 'react';
import ReactDisqusComments from 'react-disqus-comments';
import Styles from '../config/Styles';
import { css } from 'glamor';
import { Head } from 'react-static';
import { Link } from 'react-static';


const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  }),
  inner: css({
    display: 'flex',
    flexDirection: 'column',
    // flex: 1,
    [Styles.media.medium]: {
      flexDirection: 'row',
    },
    [Styles.media.large]: {
      flexDirection: 'row',
    },
  }),
  aside: {
    container: css({
      display: 'flex',
      padding: 10,
      [Styles.media.small]: {
        // flex: 1,
      },
      [Styles.media.medium]: {
        width: 280,
      },
      [Styles.media.large]: {
        width: 280,
      },
    }),
  },
  toc: {
    header: css({
      fontSize: 22,
      // marginBottom: 0,
    }),
    chapter: {
      container: css({}),
      header: css({
        fontSize: 18,
        marginBottom: 8,
      }),
    },
    ol: css({
      color: 'red',
      // listStyle: 'none',
      margin: 0,
      paddingLeft: 20,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
    }),
    li: css({
      color: Styles.colors.glt50,
      margin: 0,
    }),
    active: css({
      color: Styles.colors.accent1,
    }),
  },
  content: {
    container: css({
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: Styles.colors.white,
      [Styles.media.medium]: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 0,
        paddingBottom: 0,
      },
      [Styles.media.large]: {
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 0,
        paddingBottom: 0,
      },
    }),
  },
};


interface Props {
  toc: any;
  pageUrl: string;
  pageTitle: string;
  pageContent: string;
}

interface State { }

class TutorialDetail extends React.Component<Props, State> {

  renderNav() {
    const {
      toc,
      pageContent,
      // pageUrl,
    } = this.props;
    // const { viewer } = this.props;
    // console.log(`viewer:`, viewer);
    // const toc = viewer.page.toc;
    // console.log(`toc:`, toc);
    return (
      <nav className={styles.nav}>
        <h3 className={styles.toc.header}> {toc.title} </h3>
        {
          toc.chapters.map((c) => {
            return (
              <div key={'c_' + c.title} className={styles.toc.chapter.container}>
                <h4 className={styles.toc.chapter.header}>{c.title}</h4>
                <ol className={styles.toc.ol}>
                  {
                    c.pages.map((p) => {
                      return (
                        <li
                          key={'p_' + p.url}
                          className={styles.toc.li}
                        >
                          <Link
                            activeClassName={`${styles.toc.active}`}
                            className={styles.toc.link}
                            to={p.url}
                          >
                            {p.title}
                          </Link>
                        </li>
                      );
                    })
                  }
                </ol>
              </div>
            );
          })
        }
      </nav>
    );
  }

  render() {
    const {
      pageContent,
      pageTitle,
    } = this.props;
    // const editUrl = "https://github.com/scotchmedia/www.scotchmedia.com/blob/master/md/tutorials/meteor/#{p.book}/#{p.chapter}/#{p.section}.md"
    // const { viewer } = this.props;
    // console.log(`pageContent: `, pageContent);
    let url;
    if (process.browser && window && window.location) {
      url = window.location.href;
    }
    return (
      <div className={styles.container}>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <div className={styles.inner}>
          <aside className={styles.aside.container}>
            {this.renderNav()}
          </aside>
          <div className={styles.content.container}>
            <Highlight innerHTML>{pageContent}</Highlight>
            <h3>Comments</h3>
            {
              url && (
                <ReactDisqusComments
                  shortname="scotchmedia"
                  url={url}
                />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default TutorialDetail;
