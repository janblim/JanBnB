import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserSpotsThunk } from '../../store/spot';


const ManageSpots = () => {

    const dispatch = useDispatch();
    const userSpots = useSelector((state) => state.spotState.allUserSpots)

    useEffect( () => {
        const getUserSpots = async() => dispatch(getAllUserSpotsThunk());
        getUserSpots()
        }, []);

  return (
    <div>

        {userSpots.allSpots.map(spot => (
            <div key={`${spot.id}-${spot.address}`}>
                <span style={{cursor: 'pointer'}}>

                        {spot.address}

                </span>
            </div>
        ))}
    </div>
  );
}

export default ManageSpots;
