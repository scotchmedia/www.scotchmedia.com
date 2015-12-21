import Radium from 'radium';
import React from 'react';
import Relay from 'react-relay';
import Styles from '../config/Styles';
import Link from '../components/Link';
import ReactDisqusThread from 'react-disqus-thread';
import Highlight from 'react-highlight';

const menuMaxWidth = 300;
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
    // fontFamily: '"Slabo 27px"',
    // fontFamily: '"Bitter", serif',
    // fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 100,
    // transform: 'rotate(30deg)',
    // backgroundColor: '#eee',
    // backgroundColor: '#e0c828',
    // backgroundColor: '#f6f6f6',
    // backgroundColor: 'rgb(235, 226, 169)',
    // backgroundColor: '#bebeb7',
    backgroundColor: '#101010',
    // backgroundColor: '#060606',
    // backgroundAttachment: 'fixed',
    // backgroundPosition: 'top center',
    // backgroundColor: '#e1db29',
    // backgroundImage: 'url(/img/finley_logo_45.svg)',
    // backgroundColor: '#bfbab2',
    // backgroundColor: '#a7ada9',
    // backgroundImage: 'url(/img/finley_logo_45_dark.svg)',
    // backgroundSize: '40px auto',
    // backgroundRepeat: 'no-repeat',
    transition: '200ms ease-in',
    // paddingTop: 24,
    // paddingBottom: 24,
    // paddingLeft: 16,
    // paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    [Styles.media.large]: {
      // maxWidth: 500,
      paddingTop: 48,
      paddingBottom: 48,
    },
  },
  inner: {
    width: '100%',
    borderRadius: 4,
    boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.5)',
    // boxShadow: '0px 0px 25px rgba(135, 135, 135, 0.5)',
    [Styles.media.large]: {
      maxWidth: menuMaxWidth,
      // marginTop: 48,
      // marginBottom: 48,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [Styles.media.medium]: {
      maxWidth: menuMaxWidth,
      // marginTop: 48,
      // marginBottom: 48,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  top: {
    // backgroundColor: '#85cdc7',
    color: '#fff',
    // backgroundColor: '#242424',
    // backgroundColor: '#111',
    // backgroundColor: '#e1db29',
    backgroundColor: '#C3453F',
    // backgroundColor: '#7d7d7d',
    // height: 126,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 4,
    // backgroundAttachment: 'cover',
    // backgroundPosition: 'center center',
    // backgroundImage: 'url(/img/space3.jpg)',
    // backgroundSize: 'cover',
    borderTopRightRadius: 4,
    ':hover': {
      backgroundColor: '#c45751',
      // backgroundColor: '#7ebab5',
      // backgroundColor: '#242424',
      // backgroundColor: 'rgba(105, 104, 104, 0.94)',
      // backgroundColor: 'rgba(36, 36, 36, 0.92)',
    },
    [Styles.media.large]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
  },
  middle: {
    flex: 1,
    backgroundColor: '#fefefe',
    color: 'rgb(91, 89, 88)',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    // borderBottomLeftRadius: 8,
    // borderBottomRightRadius: 8,
    [Styles.media.large]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
  },
  footer: {
    container: {
      // display: 'block',
      width: '100%',
      color: '#b3b3b3',
      backgroundColor: '#242424',
      // backgroundColor: '#494949',
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      // boxShadow: '0px 0px 25px rgba(135, 135, 135, 0.5)',
    },
    inner: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      paddingTop: 32,
      paddingBottom: 32,
      paddingLeft: 16,
      paddingRight: 16,
      [Styles.media.medium]: {
        flexDirection: 'row',
      },
      [Styles.media.large]: {
        flexDirection: 'row',
      },
    },
    item: {
      flex: 1,
    },
    padded: {
      [Styles.media.small]: {
        paddingTop: 16,
        paddingBottom: 16,
      },
      [Styles.media.medium]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
      [Styles.media.large]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
    header: {
      fontWeight: 500,
      fontSize: 16,
      marginBottom: 16,
      paddingBottom: 8,
      borderBottom: '1px dotted #b3b3b3'
    },
  },
  logo: {
    width: 110,
    display: 'block',
    margin: '0 auto',
  },
  header: {
    fontSize: 32,
    // marginBottom: 24,
  },
  section: {
    display: 'block',
    // marginTop: 24,
    marginBottom: 36,
  },
  ul: {
    listStyle: 'none',
  },
  li: {
    marginBottom: 8,
    fontSize: 16,
    color: '#5ab9b9',
  },
  subheader: {
    fontSize: 18,
    fontWeight: 500,
    paddingBottom: 16,
  },
  contact: {
    item: {
      marginTop: 8,
      marginBottom: 8,
      fontSize: 13,
    },
    name: {
      fontSize: 14,
    },
    email: {
      color: '#5ab9b9',
    },
    phone: {

    },
  },
  contactLink: {
    fontSize: 13,
    display: 'block',
    paddingBottom: 8,
  },
  // contact: {
  //   marginTop: 24,
  //   marginBottom: 24,
  // },
  inner: {
    display: 'flex',
    flexDirection: 'row',
  }
};

@Radium
class TutorialDetail extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired,
    viewer: React.PropTypes.object.isRequired,
  }

  state = {
    page: 'home',
  }

  onEdit(e) {
    console.log(`edit:`, e);
  }

  render() {
    // const editUrl = "https://github.com/scotchmedia/www.scotchmedia.com/blob/master/md/tutorials/meteor/#{p.book}/#{p.chapter}/#{p.section}.md"
    const { viewer } = this.props;
    return (
      <section className="container">
        <div style={styles.inner}>
          <aside className="SideNav">
            <div dangerouslySetInnerHTML={{__html: viewer.toc.content}} />
          </aside>

          <div className="PageContent">
            <Highlight innerHTML>
              {viewer.page.content}
            </Highlight>
            <h3>Comments</h3>
            <ReactDisqusThread
              shortname="scotchmedia"
              />
          </div>
        </div>
      </section>
    );
  }
}

              // identifier="something-unique-12345"
              // title="Example Thread"
              // url="http://www.example.com/example-thread"
              // category_id="123456"

export default Relay.createContainer(TutorialDetail, {
  initialVariables: { splat: null },

  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        page: page(id: $splat) {
          url
          content
        }
        toc: page(id: "express/authentication/toc") {
          url
          content
        }
      }
    `,
  },
});
