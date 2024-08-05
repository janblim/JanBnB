import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import './AddReviewModal.css';
import { postReviewThunk } from "../../store/review";

function AddReviewModal({id, user}){
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null);
    const [errors, setErrors] = useState({});
    const [hover, setHover] = useState(null);
    const [showErrors, setShowErrors] = useState(false)


    useEffect(() => { //for dynamic error handling
        const newErrors = {};
        if(!review){
          newErrors.review = 'Review text is required';
        }
        if(review.length < 5){
            newErrors.rating = 'Review must be 5 characters or more'
        }
        if(!rating){
          newErrors.rating = 'Star rating is required';
        }
        if(rating < 1 || rating > 5){
            newErrors.rating = 'Star rating must be between 1 and 5';
        }
        setErrors(newErrors);
      }, [review, rating])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.values(errors).length){
            setShowErrors(true)
            return
        }
        setErrors({});
        return dispatch(postReviewThunk(id, review, rating, user))
                .then(closeModal)

    }

return (
    <div id='review-modal'>
        <h2>How was your stay?</h2>

        {errors.review && showErrors? <label className='error'>{errors.review}</label> : null}
        {errors.rating && showErrors? <label className='error'>{errors.rating}</label> : null}

        <form id='review-form' onSubmit={handleSubmit}>
           <textarea id='review' rows='10' cols='55' type='text'
           placeholder='Leave your review here...'
           onChange={(e) => setReview(e.target.value)}>
           </textarea>
           <br></br>
           <div id='star-box'>
                <ul id='stars'>
                    {[...Array(5).keys()].map((i) => {
                        const currentRating = i + 1;
                        return (
                            <li key={`${currentRating}-star`} >
                                <label

                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(null)}
                                    >
                                <input
                                    type='radio'
                                    id={`${currentRating}-input`}
                                    name='rating'
                                    value={currentRating}
                                    onClick={() => setRating(currentRating)}

                                    >
                                </input>
                                    {currentRating <= (hover || rating) ? <FaStar className='star'/> : <FaRegStar className='star'/> }
                                </label>
                            </li>
                        )
                    })}
                </ul>
                <div id='stars-text'>
                    Stars
                </div>
            </div>

            <br></br>
            <button
            className={review && rating ? 'red-button' : 'red-button-disabled'}
            id='submit-button'
            type='submit'>
                Submit Review
            </button>
        </form>
    </div>
)
}

export default AddReviewModal;
