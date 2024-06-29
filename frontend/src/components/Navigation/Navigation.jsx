import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
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
                <OpenModalButton
                    buttonText='Log In'
                    modalComponent={<LoginFormModal />}
                />
            </li>
            <li>
                <OpenModalButton
                    buttonText="Sign Up"
                    modalComponent={<SignupFormModal />}
                />
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
