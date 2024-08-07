import { IoReorderThreeSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import * as sessionActions from '../../store/session'
import { useNavigate } from "react-router-dom";





function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false); //stores boolean to control dropdown menu
    const ulRef = useRef();
    const firstLetterUser = user.firstName.charAt(0);

    const toggleMenu = (e) => {
        e.stopPropagation(); //keeps click from bubbling up to doc & triggering closeMenu
        setShowMenu(!showMenu);
    }

    useEffect(() => { // opens dropdown menu by changing showMenu to false
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu); //cleanup function removes event listener
    }, [showMenu]);



    //logout handler
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
        navigate('/')
    };

    const manageSpotsClick = (e) => {
        e.preventDefault();
        navigate('/managespots')
    }


    //change classname of dropdown menu if showMenu is false (hidden)
    const ulClassName = 'profile-dropdown' + (showMenu ? "" : " hidden");

    return (
        <>
        <div className='profile-menu'>
            <div className="profile-box"></div>
                <span
                onClick={toggleMenu}
                className='profile-button'>
                    <div className='three-bars'>
                        <IoReorderThreeSharp />
                    </div>
                    <div id="name-circle">
                        <span id='name-letter'>{firstLetterUser}</span>
                    </div>
                </span>
                    <ul className={ulClassName} ref={ulRef}>
                        <li>Hello, {user.firstName}!</li>
                        <li>{user.email}</li>
                        <hr></hr>
                        <li id='manage-button' onClick={(e) => manageSpotsClick(e)}>
                            Manage Spots
                        </li>
                        <hr></hr>
                        <li>
                            <button onClick={(e) => logout(e)}>
                                Log Out
                            </button>
                        </li>
                    </ul>
        </div>
        </>
    )
}

export default ProfileButton;
