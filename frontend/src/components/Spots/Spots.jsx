import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsThunk } from '../../store/spot';



const Spots = () => {

    const dispatch = useDispatch()
    const spots = useSelector(state => state.spotState.allSpots) // grabs state

    useEffect(() => {
        const getSpots = async () => {
            console.log('step two')
            dispatch(getAllSpotsThunk())
        }
        getSpots();
    }, []);

  return (
    <div>
        {spots.map(spot => (
            <div key={`${spot.id}-${spot.address}`}>
                <span>
                 {spot.address}
                </span>
            </div>
        ))}
        <h1>Hello!</h1>
    </div>
  );
}

export default Spots;
