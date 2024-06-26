import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import * as sessionActions from '../../store/session'




function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false); //stores boolean to control dropdown menu
    const ulRef = useRef();

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
            <button
            style={{color: 'black', fontSize: '30px'}}
            onClick={toggleMenu}>
                <CgProfile />
            </button>
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
        </>
    )
}

export default ProfileButton;
