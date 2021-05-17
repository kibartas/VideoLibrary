import React from 'react';
import ReactPlayer from 'react-player';
import { withRouter } from 'react-router';
import TopBar from '../../components/TopBar/TopBar';
import { DeleteIcon, DownloadIcon, InfoIcon } from '../../assets';
import './styles.css';
import { getVideoDetails } from '../../api/VideoAPI';
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';

class PlayerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: undefined,
      video: undefined,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      playbackErrorShowing: false,
    };
    this.topBarRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);

    const { match } = this.props;
    const { videoId } = match.params;

    getVideoDetails(videoId)
      .then((response) => {
        const userId = window.sessionStorage.getItem('id');
        const url = `http://localhost:61346/api/Videos/stream?videoId=${videoId}&userId=${userId}`;
        this.setState({ url, video: response.data });
      })
      .catch(() => this.setState({ playbackErrorShowing: true }));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () =>
    this.setState({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    });

  render() {
    const {
      url,
      video,
      screenWidth,
      screenHeight,
      playbackErrorShowing,
    } = this.state;

    // This fallback height is needed, since TopBar is not rendered until video information is fetched, so ref will be null
    const fallBackTopBarHeight = screenWidth > 600 ? 64 : 56; // These values are from Material UI AppBar source code
    const topBarHeight =
      this.topBarRef.current !== null
        ? this.topBarRef.current.clientHeight
        : fallBackTopBarHeight;

    const handleArrowBackClick = () => {
      window.location.href = '/library';
    };

    const hidePlaybackError = () => {
      this.setState({ playbackErrorShowing: false });
      handleArrowBackClick();
    };

    return (
      <div className=".root">
        {video === undefined ? (
          playbackErrorShowing && (
            <CustomSnackbar
              topCenter
              message="A playback error has occured. Please try again later"
              onClose={hidePlaybackError}
              severity="error"
            />
          )
        ) : (
          <>
            <div ref={this.topBarRef}>
              <TopBar
                darkMode
                firstName={window.sessionStorage.getItem('firstName')}
                lastName={window.sessionStorage.getItem('lastName')}
                title={video.title}
                showArrow
                onActionIconClick={handleArrowBackClick}
                iconsToShow={[InfoIcon, DownloadIcon, DeleteIcon]}
              />
            </div>
            <div className="player-wrapper">
              <ReactPlayer
                playing
                width={screenWidth}
                height={screenHeight - topBarHeight}
                url={url}
                controls
                controlsList="nodownload"
              />
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withRouter(PlayerPage);