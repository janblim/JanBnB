import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpotThunk } from '../../store/spot';
import './SpotDetails.css'
import { useEffect } from 'react';
import { FaStar } from "react-icons/fa";
import AddReviewModal from '../AddReviewModal/AddReviewModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import { getSpotReviewsThunk } from '../../store/review';
import ConfirmDeleteReviewModal from '../ConfirmDeleteReviewModal/ConfirmDeleteReviewModal';

const SpotDetails = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const spot = useSelector((state) => state.spotState.spot)
    const spotImages = useSelector((state) => state.spotState.spot.SpotImages)
    const owner = useSelector((state) => state.spotState.spot.Owner)
    const reviews = useSelector((state) => state.reviewState.reviews)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    useEffect(() => {
        dispatch(getSpotReviewsThunk(id))
            .then(dispatch(getOneSpotThunk(id)))
    }, [dispatch, id]);

    const starRating = (stars) => {
        return (
           <div id='star-rating'>
            {
                [...Array(stars).keys()].map((i) => { //creates array of number of stars for rating
                    return (
                        <div key={`${i}-star`}>
                        <FaStar/>
                    </div>
                )})
            }
            </div>
        )
    }

    const avgRating = () => {
        let sum = 0
        for(const review of reviews ){
            sum = sum + review.stars
        }
        return ((sum/reviews.length).toFixed(1))
    }


    const postReviewController = (reviews) => {
        if(!user){
            return null
        }
        if(owner.id === user.id){ //if owner of spot is current user, return null
            return null
        }
        for (const review of reviews){ //if any of reviews were written by current user, return null
            if(review?.userId === user.id){
                return null
            }
        }
        return ( //returns the postreview button only if previous two conditionals are false
                <>
                    <OpenModalButton
                    buttonText='Post Your Review'
                    modalComponent={<AddReviewModal id={id} user={user}/>}
                    />
                    {reviews.length ?
                        null : <h4>Be the first to post a review!</h4>}
                </>
                )
    }

    const comingSoon = (e) => {
        e.preventDefault();
            window.alert('Feature Coming Soon...')
    }


  return spotImages && spot && reviews && owner && ( // all needed variable must be not null before this is returned
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

        <div id='info-box'>

            <div id='text'>
                <h2>Hosted by {owner.firstName} {owner.lastName}</h2>
                <p>
                    {spot.description}
                </p>
            </div>

            <div id='reserve-box'>
                <div id='reserve-layout'>
                    <div id='reserve-info'>
                        <div >
                            <span id='price'> ${spot.price.toFixed(2)} </span>
                            <span>per night</span>
                        </div>
                        &ensp;&ensp;&ensp;&ensp;&ensp;
                        <span id='reserve-review'>
                            <FaStar/>
                            &ensp;
                            {reviews.length ?
                                <>
                                {avgRating()}&ensp; &#8226; &ensp;
                                {reviews.length}&ensp;review{reviews.length > 1  ? 's' : null}
                                </>
                                :
                                <>New</>
                            }
                        </span>
                    </div>
                    <button onClick={(e) => {comingSoon(e)}} id='reserve-button' className='red-button'>
                        Reserve
                    </button>
                </div>
            </div>
        </div>

        <hr></hr>
        <div id='review-info'>

            {reviews.length ?
                <h2><FaStar/> {avgRating()}&ensp; &#8226; &ensp;{reviews.length} review{reviews.length > 1 ? 's' : null} </h2>
                :
                <h2><FaStar/> New</h2>
            }

            {postReviewController(reviews)}

        </div>

        <br></br>

        <div id='review-box'>

            <div id='reviews'>
                {reviews.map((review) => {
                        return(
                            <div className='review' key={`${review.id}`}>
                                <h4>{review.User.firstName}</h4>
                                <div id='date-and-stars'>
                                    <div>
                                        {starRating(review.stars)}
                                    </div>
                                    &nbsp;&nbsp;&nbsp;
                                    <div className='date'>
                                        {monthNames[new Date(review.createdAt).getMonth()]}
                                        &nbsp;
                                        {new Date(review.createdAt).getFullYear()}
                                    </div>
                                </div>
                                <br></br>

                                    <div>{review.review}</div>

                                <br></br>

                                    {review.userId === user?.id ?

                                    <OpenModalButton
                                    buttonText='Delete'
                                    modalComponent={<ConfirmDeleteReviewModal id={review.id}/>}
                                    />
                                    : null}
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    </div>
  );
}

export default SpotDetails;
