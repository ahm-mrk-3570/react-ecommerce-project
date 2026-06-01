import { Link } from 'react-router-dom';
import InputBox from '../../components/InputBox';
import './ForegetPage.css';
import { useState } from 'react';

export default function ForgetPage() {
  const [isOTP, setIsOTP] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [email, setEmail] = useState('ahmmrk@gmail.com');

  const goToWriteCode = () => {
    if(isOTP === false) {
      setIsOTP(true);
    }

    if(isOTP === true && isChangePassword === false) {
      setIsOTP(false);
      setIsChangePassword(true);
    }

    if(isChangePassword === true) {
      //Changing password
    }
  }

  return (
    <>
      <title>Forget Password</title>
      <div className='forget-body'>
        <div className="left-side-forget"></div>
        <div className="right-side-forget">
          <div className='fields-forget'>
            <Link to="/login" className="back-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
              </svg>
              <span>Back</span>
            </Link>
            <div className='top-fields-container-forget'>
              <h1>{isOTP === false ? isChangePassword === true ? "Enter new password" : "Forget Password" : "Enter OTP"}</h1>
              <h3>{isOTP === false ? isChangePassword === true ? "Enter your new password here" : "Enter your registered email address. we’ll send you a code to reset your password." : `We have share a code of your registered email address
              ${email}`}</h3>
            </div>
            <div className='middle-fields-container-forget'>
              {isChangePassword === true ? (
                <>
                  <InputBox id="new-pass" title="New Password" placeHolder="" />
                  <InputBox id="confirm-pass" title="Confirm Password" placeHolder="" />
                </>
              ) : <InputBox id='email' placeHolder={isOTP === true ? "XXXXXX" : ""} title={isOTP === false ? "Email Address" : ""} />}
            </div>
            <div className='bottom-fields-container-forget'>
              <button onClick={goToWriteCode} className='authorization-btn'>
                {isOTP === false ? isChangePassword === true ? "Change Password" : "Send OTP" : "Verify"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
