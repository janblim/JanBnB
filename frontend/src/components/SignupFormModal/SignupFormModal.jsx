import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => { //for dynamic error handling
    const newErrors = {};
    if(email.length > 249){
      newErrors.email = 'Email must be shorter than 255 characters';
    }
    if(username.length < 5 || username.length > 249){
      newErrors.username = 'Username must be between 5 and 255 characters';
    }
    if(firstName.length > 249){
      newErrors.firstName = 'First name must be shorter than 255 characters';
    }
    if(lastName.length > 249){
      newErrors.lastName = 'Last name must be shorter than 255 characters';
    }
    if(password.length > 249){
      newErrors.password = 'Password must be shorter than 255 characters';
    }
    setErrors(newErrors);
  }, [email, username, firstName, lastName, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(Object.values(errors).length){
      return
  } else {
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  }
  };

  return (
    <div id='signup-form-box'>
      <h1>Sign Up</h1>
      <form  id='signup-form' onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='error'>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='error'>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className='error'>{errors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className='error'>{errors.lastName}</p>}
        <label>
          Password
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className='error'>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className='error'>{errors.confirmPassword}</p>
        )}
        <button
          id='signup-button'
          className={email && username && firstName && lastName && password && confirmPassword ? 'red-button' : 'red-button-disabled'}
          type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
