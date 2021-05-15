import { Grid } from '@material-ui/core';
import React from 'react';
import SortIcon from '@material-ui/icons/Sort';
import { UploadIcon } from '../../assets';
import EmptyLibraryContent from '../../components/EmptyLibraryContent/EmptyLibraryContent';
import TopBar from '../../components/TopBar/TopBar';
import UploadModal from '../../components/UploadModal/UploadModal';
import './styles.css';
import VideoCardsByDate from '../../components/VideoCardsByDate/VideoCardsByDate';
import { getAllVideos } from '../../api/VideoAPI';

const transformCards = (cards) => {
  const transformedCards = cards.reduce((acc, val) => {
    if (!acc[val.uploadDate]) {
      acc[val.uploadDate] = [];
    }
    acc[val.uploadDate].push(val);
    return acc;
  }, {});
  return { transformedCards };
};

const sortCardDates = (cards, ascending = true) =>
  Object.keys(cards).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    if (ascending) {
      if (dateA.getTime() < dateB.getTime()) return 1;
      if (dateA.getTime() === dateB.getTime()) return 0;
      return -1;
    }
    if (dateA.getTime() < dateB.getTime()) return -1;
    if (dateA.getTime() === dateB.getTime()) return 0;
    return 1;
  });

class LibraryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoCards: [],
      sortedVideoCardDates: [],
      selectedCards: [],
      showUploadModal: false,
      sortAscending: false,
    };
  }

  componentDidMount() {
    getAllVideos().then((response) => {
      const { transformedCards } = transformCards(response.data); // should be info from backend
      const sortedDates = sortCardDates(transformedCards);
      this.setState({
        videoCards: transformedCards,
        sortedVideoCardDates: sortedDates,
      });
    });
  }

  toggleSort = () => {
    const { sortAscending, videoCards } = this.state;
    this.setState({
      sortAscending: !sortAscending,
      sortedVideoCardDates: sortCardDates(videoCards, sortAscending),
    });
  };

  toggleUploadModal = () => {
    const { showUploadModal } = this.state;
    this.setState({ showUploadModal: !showUploadModal });
  };

  handleUploadModalClose = () => {
    this.toggleUploadModal();
  };

  render() {
    const {
      showUploadModal,
      videoCards,
      sortedVideoCardDates,
      selectedCards,
    } = this.state;

    const handleSelect = (id) => {
      if (selectedCards.find((cardId) => cardId === id)) {
        const newSelectedCards = selectedCards.filter(
          (cardId) => cardId !== id,
        );
        this.setState({ selectedCards: newSelectedCards });
      } else {
        this.setState({ selectedCards: [...selectedCards, id] });
      }
    };

    return (
      <Grid
        className="root"
        style={{ height: videoCards.length === 0 ? '100vh' : 'auto' }}
        container
        direction="column"
      >
        <UploadModal
          show={showUploadModal}
          onUpload={this.handleUpload}
          onClose={this.handleUploadModalClose}
        />
        <Grid item className="flexGrow">
          {selectedCards.length === 0 ? (
            <TopBar
              title="Video Library"
              onActionIconClick={() => {
                /* [TM:] TODO WDB-29 */
              }}
              showAvatarAndLogout
              firstName={window.sessionStorage.getItem('firstName')}
              lastName={window.sessionStorage.getItem('lastName')}
              iconsToShow={[SortIcon, UploadIcon]}
              onIconsClick={[this.toggleSort, this.toggleUploadModal]}
            />
          ) : (
            <TopBar
              title={`${selectedCards.length} ${
                selectedCards.length === 1 ? 'video' : 'videos'
              } selected`}
              showArrow
              onActionIconClick={() => this.setState({ selectedCards: [] })}
            />
          )}
        </Grid>
        {videoCards.length !== 0 ? (
          <Grid
            className="card_container"
            container
            item
            direction="column"
            spacing={5}
          >
            {sortedVideoCardDates.map((uploadDate) => (
              <VideoCardsByDate
                key={uploadDate}
                onSelect={handleSelect}
                videoCards={videoCards[uploadDate]}
                selectedCards={selectedCards}
                onVideoCardLoad={this.fetchThumbnail}
              />
            ))}
          </Grid>
        ) : (
          <Grid container className="flex_grow">
            <EmptyLibraryContent />
          </Grid>
        )}
      </Grid>
    );
  }
}

export default LibraryPage;
