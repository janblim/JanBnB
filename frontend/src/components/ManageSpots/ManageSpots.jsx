import {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getAllUserSpotsThunk } from '../../store/spot';
import Card from '../Card/Card';
import './ManageSpots.css'
import { useNavigate } from 'react-router-dom';
import { deleteSpotThunk } from '../../store/spot';



const ManageSpots = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSpots = useSelector((state) => state.spotState.userSpots);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        dispatch(getAllUserSpotsThunk())
        .then(() => setIsLoaded(true))
        });

    const deleteClick = (e, id) => {
        e.preventDefault();
        dispatch(deleteSpotThunk(id))
        .then(() => navigate('/managespots'))
    }

    const updateClick = (e, id) => {
        e.preventDefault();
        navigate(`/update/${id}`)
    }

    const createClick = (e) => {
        e.preventDefault();
        navigate('/newspot')
    }

    <OpenModalButton
    buttonText='Log In'
    modalComponent={<LoginFormModal />}
    />

  return isLoaded && (
    <>
        <div>
            <h1>Manage Your Spots</h1>
            <button
                onClick={(e) => createClick(e)}
                >Create a New Spot</button>
        </div>
        <div id='card-container'>
            {Object.keys(userSpots).map((key) => { //iterate through an array of keys in userSpots
                const spot = userSpots[key]
                return (
                    <div key={`${spot.id}-${spot.address}`}>
                        <span>
                            <Card
                            id={spot.id}
                            name={spot.name}
                            preview={spot.previewImage}
                            city={spot.city}
                            state={spot.state}
                            rating={spot.avgRating}
                            price={spot.price}
                            />
                        </span>
                        <span className='button-box'>
                            <button
                                className='update'
                                onClick={(e) => updateClick(e, spot.id)}
                            >
                                Update
                            </button>
                            <button
                                className='delete'
                                onClick={(e) => deleteClick(e, spot.id)}
                            >
                                Delete
                            </button>
                        </span>
                    </div>
                    )
                }
            )}
        </div>
    </>
  );
}

export default ManageSpots;
