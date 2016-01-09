import Radium from 'radium';
import React from 'react';
import Relay from 'react-relay';
import Styles from '../config/Styles';
import Link from '../components/Link';
import ReactDisqusThread from 'react-disqus-thread';
import Highlight from 'react-highlight';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    // flex: 1,
    [Styles.media.medium]: {
      flexDirection: 'row',
    },
    [Styles.media.large]: {
      flexDirection: 'row',
    },
  },
  aside: {
    container: {
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
    },
  },
  toc: {
    header: {
      fontSize: 22,
      // marginBottom: 0,
    },
    chapter: {
      container: {},
      header: {
        fontSize: 18,
        marginBottom: 8,
      },
    },
    ol: {
      color: 'red',
      // listStyle: 'none',
      margin: 0,
      paddingLeft: 20,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
    },
    li: {
      color: Styles.colors.glt50,
      margin: 0,
    },
    active: {
      color: Styles.colors.accent1,
    },
  },
  content: {
    container: {
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
    },
  },
};

@Radium
class TutorialDetail extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.setTitle();
    this.state = {
      page: 'home',
    };
  }

  componentDidUpdate() {
    this.setTitle();
  }

  onEdit(e) {
    console.log(`edit:`, e);
  }

  setTitle() {
    const { toc } = this.props.viewer.page;
    const { params } = this.props;
    let t = '';
    try {
      const chapter = parseInt(params.chapter, 10) - 1;
      const page = parseInt(params.page, 10) - 1;
      const c = toc.chapters[chapter];
      const p = c.pages[page];
      let book = 'Express Auth';
      if (params.category === 'meteor') {
        book = 'Meteor Blog';
      }
      t = `${p.title} > ${c.title} > ${toc.title} > ${book}`;
    } catch (e) {
      console.log(`e:`, e);
    }
    document.title = t + ' - Scotch Media Tutorials';
  }

  renderNav() {
    const { viewer } = this.props;
    // console.log(`viewer:`, viewer);
    const toc = viewer.page.toc;
    // console.log(`toc:`, toc);
    return (
      <nav style={styles.nav}>
        <h3 style={styles.toc.header}> {toc.title} </h3>
        {toc.chapters.map((c) => {
          return (
            <div key={'c_' + c.id} style={styles.toc.chapter.container}>
              <h4 style={styles.toc.chapter.header}>{c.title}</h4>
              <ol style={styles.toc.ol}>
                {c.pages.map((p) => {
                  return (
                    <li
                      key={'p_' + p.id}
                      style={styles.toc.li}
                      >
                      <Link
                        activeStyle={styles.toc.active}
                        style={styles.toc.link}
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
    // const editUrl = "https://github.com/scotchmedia/www.scotchmedia.com/blob/master/md/tutorials/meteor/#{p.book}/#{p.chapter}/#{p.section}.md"
    const { viewer } = this.props;
    const url = window.location.href;
    return (
      <div style={styles.container}>
        <div style={styles.inner}>
          <aside style={styles.aside.container}>
            {this.renderNav()}
          </aside>
          <div style={styles.content.container}>
            <Highlight innerHTML>{viewer.page.content}</Highlight>
            <h3>Comments</h3>
            <ReactDisqusThread
              shortname="scotchmedia"
              url={url}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(TutorialDetail, {
  initialVariables: {
    category: null,
    book: null,
    chapter: null,
    page: null,
  },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        page(category: $category book: $book chapter: $chapter page: $page) {
          url
          content
          toc {
            title
            chapters {
              id
              title
              pages {
                id
                title
                url
              }
            }
          }
        }
      }
    `,
  },
});
