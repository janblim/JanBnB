import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsThunk } from '../../store/spot';
import { useNavigate } from 'react-router-dom';


const Splash = () => {

    const dispatch = useDispatch()
    const spots = useSelector(state => state.spotState.allSpots) // grabs state
    const navigate = useNavigate()

    useEffect(() => {
        const getSpots = async () => {

            dispatch(getAllSpotsThunk())
        }
        getSpots();
    }, []);

    //go to Spot Details handler

    const goToSpotDetails = (e, spot) => {
        e.stopPropagation();
        navigate(`/spots/${spot.id}`)
    }

  return (
    <div>
        {spots.map(spot => (
            <div key={`${spot.id}-${spot.address}`}>
                <span
                style={{cursor: 'pointer'}}
                onClick={(e) => goToSpotDetails(e, spot)}>

                        {spot.address}

                </span>
            </div>
        ))}
    </div>
  );
}

export default Splash;
