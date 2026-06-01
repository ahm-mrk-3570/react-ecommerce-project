import { Link } from 'react-router-dom';
import ChangeThemeBoxHandling from '../../components/ChangeThemeBoxHandling';
import InputBox from '../../components/InputBox';
import './Login.css';

export default function Login() {
  return (
    <>
      <title>Login</title>
      <div className='login-body'>
        <div className="left-side-login"></div>
        <div className="right-side-login">
          <div className='fields-container-login'>
            <div className='top-field-container-login'>
              <h1 className='top-filed-title-login'>Welcome 👋</h1>
              <h3 className='top-field-description-login'>Please login here</h3>
            </div>
            <div className='middle-field-container-login'>
              <InputBox title="Email" id="email" />
              <InputBox title="Password" id="password" />
              <ChangeThemeBoxHandling />
            </div>
            <div className='bottom-field-container-login'>
              <div className='forget-container-login'>
                <div className='remember-login'>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <div className='forget'>
                  <Link to="/forget">Forget Password?</Link>
                </div>
              </div>
              <button className='btn-signup-login' id='btn-register'>Signup</button>
              <span style={{marginTop : '15px', }}>
                Already have an account?
                <Link style={{paddingLeft : '5px', fontSize : '1.2rem'}} to="/register">
                  Sign Up 
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
