import {useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getAllUserSpotsThunk } from '../../store/spot';
import Card from '../Card/Card';
import './ManageSpots.css'
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';


const ManageSpots = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSpots = useSelector((state) => state.spotState.userSpots);
    const userSpotsArr = Object.values(userSpots);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
        dispatch(getAllUserSpotsThunk())
        .then(() => setIsLoaded(true))
        }, [userSpots, dispatch]);


    const updateClick = (e, id) => {
        e.preventDefault();
        navigate(`/update/${id}`)
    }

    const createClick = (e) => {
        e.preventDefault();
        navigate('/newspot')
    }

  return isLoaded && (
    <>
        <div>
            <h1>Manage Your Spots</h1>
            <button
                onClick={(e) => createClick(e)}
                >Create a New Spot</button>
        </div>
        <div id='card-container'>
            {userSpotsArr.map((spot) => { //iterate through an array of keys in userSpots
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
                            <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<ConfirmDeleteModal id={spot.id} />}
                            />
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
