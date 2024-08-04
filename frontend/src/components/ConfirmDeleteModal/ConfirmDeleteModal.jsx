import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './ConfirmDeleteModal.css';
import * as spotActions from '../../store/spot';

function ConfirmDeleteModal({id}){
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const YesDeleteClick = (e, id) => {
        e.preventDefault();
        dispatch(spotActions.deleteSpotThunk(id))
        .then(closeModal)
    }

return (
    <div id='delete-modal'>
            <h2>Confirm Delete</h2>
            <p>
                Are you sure you want to remove this spot<br></br>
                from the listings?
            </p>

            <button
                id='delete-button'
                className='red-button'
                onClick={(e) => YesDeleteClick(e, id)}
            >
                Yes (Delete Spot)
            </button>
            <br></br>
            <button
                id='no-button'
                onClick={closeModal}
            >
                No (Keep Spot)
            </button>
    </div>
)
}

export default ConfirmDeleteModal;
