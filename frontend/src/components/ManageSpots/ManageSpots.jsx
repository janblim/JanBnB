import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserSpotsThunk } from '../../store/spot';
import Card from '../Card/Card';
import './ManageSpots.css'


const ManageSpots = () => {

    const dispatch = useDispatch();
    const userSpots = useSelector((state) => state.spotState.allUserSpots.allSpots)

    useEffect( () => {
        const getUserSpots = async() => dispatch(getAllUserSpotsThunk());
        getUserSpots()
        }, []);

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
                        <button className='update'>Update</button>
                        <button className='delete'>Delete</button>
                    </span>
                </div>
            ))}
        </div>
    </>
  );
}

export default ManageSpots;
