import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpotThunk } from '../../store/spot';
import './SpotDetails.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import AddReviewModal from '../AddReviewModal/AddReviewModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

const SpotDetails = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spotState.spot)
    const spotImages = useSelector((state) => state.spotState.spot.SpotImages)
    const owner = useSelector((state) => state.spotState.spot.Owner)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getOneSpotThunk(id))
        .then(() => (setIsLoaded(true))) //makes it so it returns ONLY AFTER thunk is dispatched
    }, [dispatch, id]);

    const postReview = (e) => {
        e.preventDefault();
    }

  return isLoaded && ( // isLoaded must be true before this is returned
    <div id='main'>
        <h1>{spot.name}</h1>
        <h4>{spot.city}, {spot.state}, {spot.country}</h4>

        <div id='picture-container'>
            <div id='left'>
                <img id='prev' src={spotImages[0].url}></img>
            </div>
            <div id='right'>
                <div>
                    <img id='img1' src={spotImages[1] ? spotImages[1].url : 'no image' }></img>
                </div>
                <div>
                    <img id='img2' src={spotImages[2] ? spotImages[2].url : 'no image'}></img>
                </div>
                <div>
                    <img id='img3' src={spotImages[3] ? spotImages[3].url : 'no image'} ></img>
                </div>
                <div>
                    <img id='img4' src={spotImages[4] ? spotImages[4].url : 'no image'}></img>
                </div>
            </div>
        </div>

        <div id='text'>
            <h2>Hosted by {owner.firstName}</h2>
            <p>
                {spot.description}
            </p>
        </div>
        <hr></hr>
        <div id='review-box'>
            <h2><FaStar/> New</h2>


            <OpenModalButton
                buttonText='Post Your Review'
                modalComponent={<AddReviewModal />}
            />


            <h4>Be the first to post a review!</h4>
        </div>
    </div>
  );
}

export default SpotDetails;
