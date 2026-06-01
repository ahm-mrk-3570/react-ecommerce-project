import './Register.css';
import InputBox from '../../components/InputBox';
import CheckBoxComponent from '../../components/RegisterComponents/CheckBoxComponent';
import ChangeThemeBoxHandling from '../../components/ChangeThemeBoxHandling';
import { Link } from 'react-router-dom';

export default function Register() {

  return (
    <>
      <title>Register</title>
      <div className='register-body'>
        <div className="left-side"></div>
        <div className="right-side">
          <div className='fields-container'>
            <div className='top-field-container'>
              <h1 className='top-filed-title'>Create New Account</h1>
              <h3 className='top-field-description'>Please enter details</h3>
            </div>
            <div className='middle-field-container'>
              <InputBox title="First Name" id="first-name" />
              <InputBox title="Last Name" id="last-name" />
              <InputBox title="Email" id="email" />
              <InputBox title="Password" id="password" />
              <CheckBoxComponent />
              <ChangeThemeBoxHandling />
            </div>
            <div className='bottom-field-container'>
              <button className='btn-signup' id='btn-register'>Signup</button>
              <span style={{marginTop : '15px', }}>
                Already have an account?
                <Link style={{paddingLeft : '5px', fontSize : '1.2rem'}} to="/login">
                  Sign In
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
