import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const sessionLinks = sessionUser ? ( //if there is a sessionUser, make user button
        <li>
            <ProfileButton user={sessionUser} />
        </li>
    ) : (   // if no sessionUser, make login and signup buttons
        <>
            <li>
                <NavLink to='/login'>Log In</NavLink>
            </li>
            <li>
                <NavLink to='/signup'>Sign Up</NavLink>
            </li>
        </>
    );

    return ( //checks if the user isLoaded first, then renders sessionLinks
        <ul>
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;
