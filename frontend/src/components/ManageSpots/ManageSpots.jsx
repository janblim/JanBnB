import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserSpotsThunk } from '../../store/spot';
import Card from '../Card/Card';
import './ManageSpots.css'
import { useNavigate } from 'react-router-dom';
import { deleteSpotThunk } from '../../store/spot';
import { getOneSpotThunk } from '../../store/spot';



const ManageSpots = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [deleteTrigger, setDeleteTrigger] = useState(0)
    const userSpots = useSelector((state) => state.spotState.allUserSpots.allSpots)

    useEffect( () => {
        const getUserSpots = async() => dispatch(getAllUserSpotsThunk());
        getUserSpots()
        }, [deleteTrigger]);

    const deleteClick = (e, id) => {
        e.preventDefault();
        dispatch(deleteSpotThunk(id))
        navigate('/managespots')
        setDeleteTrigger(e => e + 1)
    }

    const updateClick = (e, id) => {
        e.preventDefault();
        dispatch(getOneSpotThunk(id))
        navigate(`/update/${id}`)
    }

  return (
    <>
        <div>
            <h1>Manage Your Spots</h1>
            <button>Create a New Spot</button>
        </div>
        <div id='card-container'>
            {userSpots.map(spot => (
                <div key={`${spot.id}-${spot.address}`}>
                    <span>
                        <Card
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
                            Delete {spot.id}
                        </button>
                    </span>
                </div>
            ))}
        </div>
    </>
  );
}

export default ManageSpots;
