import React, { useState } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import MovieAPI from '../../../api/backend/movies';
import UserUtils from '../../../utils/user/UserUtils';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { Button } from '@material-ui/core';
import { faListAlt, faHeading, faMoneyBillAlt, faBuilding } from '@fortawesome/free-solid-svg-icons';

library.add(faListAlt, faHeading, faMoneyBillAlt, faBuilding);

const VideoCard = ({
  title,
  embedUrl,
  description,
  sharedByEmail,
  movieID,
}) => {
  const [liked, setLiked] = useState(false);

  const handleLikeMovie = (movieID) => {
    const params = {
      movie_id: movieID,
      reaction_type: 0
    };
    MovieAPI.likeMovie(params, UserUtils.getAccessToken())
      .then(res => {
        if (res.status === 201) {
          setLiked(true);
          alert("Liked");
        }
      })
      .catch(e => console.log("error", e));
  };

  const checkUserLikedMovie = (movieID) => {
    // Your logic to check if the user liked the movie
    return false;
  };

  const renderButtonLike = (movieID) => {
    if (!checkUserLikedMovie(movieID)) {
      return (
        <Button variant="contained" color="secondary" onClick={() => handleLikeMovie(movieID)}>
          <ThumbUpIcon>
            Like
          </ThumbUpIcon>
        </Button>
      );
    } else {
      return (
        <Button variant="contained" color="secondary" onClick={() => handleLikeMovie(movieID)}>
          <ThumbUpIcon>
            Liked
          </ThumbUpIcon>
        </Button>
      );
    }
  };

  return (
    <div className="VideoCard">
      <Card className="VideoCard-container">
        <div className="col-md-6">
          <iframe className="VideoCard-cardImg" width="420" height="300" src={embedUrl}></iframe>
        </div>
        <CardBody className="col-md-6">
          <CardTitle>
            <span className="VideoCard-title">{title}</span>
          </CardTitle>
          <CardTitle><span>{`Shared by: ${sharedByEmail}`}</span></CardTitle>
          {renderButtonLike(movieID)}
          <CardTitle>Description: <br /><span>{description}</span></CardTitle>
        </CardBody>
      </Card>
    </div>
  );
};

VideoCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  sharedByEmail: PropTypes.string,
  embedUrl: PropTypes.string,
  movieID: PropTypes.any,
};

export default VideoCard;
