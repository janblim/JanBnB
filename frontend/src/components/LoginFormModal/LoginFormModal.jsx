import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/session';
import './LoginForm.css'

function LoginFormModal(){
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    //variables
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(''); //only error is message invalid credentials

    // if (sessionUser){ //if there is a session user, go to '/'
    //     return (<Navigate to="/" replace={true}/>);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
            setErrors(''); //empties errors
            return dispatch(sessionActions.login({credential, password}))
               .then(closeModal)
               .catch(async (res) => {
                    const data = await res.json();
                    if (data?.message){
                        setErrors(data.message);
                        console.log(errors)
                    }
               });
    };

    return (
        <div id='login-box'>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username or Email
                <input
                    type='text'
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
                </label>
                <label>
                    Password
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
            {errors && <p className='error'>{errors}</p>}
            <button
                id='login-button'
                className={credential && password ? 'red-button' : 'red-button-disabled'}
                type='submit'>
                Log In
            </button>
            </form>
        </div>
    )
}

export default LoginFormModal;
