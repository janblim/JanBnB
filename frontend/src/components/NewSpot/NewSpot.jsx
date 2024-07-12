import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllSpotsThunk } from '../../store/spot';
import { useNavigate } from 'react-router-dom';



const NewSpot = () => {

    const dispatch = useDispatch()
    // const spots = useSelector(state => state.spotState.allSpots) // grabs state
    const navigate = useNavigate()

    // useEffect(() => {
    //     const getSpots = async () => {

    //         dispatch(getAllSpotsThunk())
    //     }
    //     getSpots();
    // }, []);

    //go to Spot Details handler

    // const goToSpotDetails = (e, spot) => {
    //     e.stopPropagation();
    //     navigate(`/spots/${spot.id}`)
    // }

  return (
    <div>
        <h1>SpotForm</h1>
    </div>
  );
}

export default NewSpot;
