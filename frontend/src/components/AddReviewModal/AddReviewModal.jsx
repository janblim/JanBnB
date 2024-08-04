import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import './AddReviewModal.css';
import { postReviewThunk } from "../../store/spot";

function AddReviewModal({id}){
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [review, setReview] = useState('');
    const [rating, setRating] = useState(null);
    const [errors, setErrors] = useState({});
    const [hover, setHover] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
            return dispatch(postReviewThunk(id, review, rating))
                .then(closeModal)
                .catch(async (res) => {
                    if (data && data.errors){
                        setErrors(data.errors)
                    }
                });
    }

return (
    <div id='review-modal'>
        <h2>How was your stay?</h2>
        <form id='review-form' onSubmit={handleSubmit}>
           <textarea id='review' rows='10' cols='55' type='text'
           placeholder='Leave your review here...'
           onChange={(e) => setReview(e.target.value)}>
           </textarea>
           <br></br>
           <div id='star-box'>
                <ul id='stars'>
                    {[...Array(5)].map((i) => {
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
            {errors.credential && <p>{errors.credential}</p>}
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
