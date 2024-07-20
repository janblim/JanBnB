import { CgProfile } from "react-icons/cg";
import { IoReorderThreeSharp } from "react-icons/io5";

import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import * as sessionActions from '../../store/session'





function ProfileButton({ user }) {
    const dispatch = useDispatch();
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
    };


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
                        <li>{user.username}</li>
                        <li>{user.firstName} {user.lastName}</li>
                        <li>{user.email}</li>
                        <li>
                            <button onClick={logout}>
                                Log Out
                            </button>
                        </li>
                    </ul>
        </div>
        </>
    )
}

export default ProfileButton;
