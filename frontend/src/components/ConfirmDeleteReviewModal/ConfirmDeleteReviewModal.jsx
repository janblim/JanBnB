import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './ConfirmDeleteReviewModal.css';
import { deleteReviewThunk } from "../../store/review";

function ConfirmDeleteReviewModal({id}){
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const YesDeleteClick = (e, id) => {
        e.preventDefault();
        dispatch(deleteReviewThunk(id))
        .then(closeModal)
    }

return (
    <div id='delete-modal'>
            <h2>Confirm Delete</h2>
            <p>
                Are you sure you want to delete this review?
            </p>

            <button
                id='delete-button'
                className='red-button'
                onClick={(e) => YesDeleteClick(e, id)}
            >
                Yes (Delete Review)
            </button>
            <br></br>
            <button
                id='no-button'
                onClick={closeModal}
            >
                No (Keep Review)
            </button>
    </div>
)
}

export default ConfirmDeleteReviewModal;
