import { useRef, useState } from 'react';
import ChangeThemeBoxHandling from '../../../../../components/ChangeThemeBoxHandling';
import './Setting.css';

export default function Setting() {
  const [twoFactorAuth, setTwoFactorAuth] = useState(localStorage.getItem('twoFactorAuth') || false);
  const [pushNotif, setPushNotif] = useState(localStorage.getItem('pushNotif') || false);
  const [desktopNotif, setDesktopNotif] = useState(localStorage.getItem('desktopNotif') || false);
  const [emailNotif, setEmailNotif] = useState(localStorage.getItem('emailNotif') || false);

  const twoFactor = useRef();
  const push = useRef();
  const desktop = useRef();
  const email = useRef();
  const twoFactorContainer = useRef();
  const pushContainer = useRef();
  const desktopContainer = useRef();
  const emailContainer = useRef();

  const handleToggle = (ref) => {
    if(ref === "two-factor") {
      if(twoFactor.current.style.transform === "translateX(0%)" || twoFactor.current.style.transform === "") {
        twoFactor.current.style.transform = "translateX(160%)";
        twoFactorContainer.current.style.backgroundColor = "green";
      } else {
        twoFactor.current.style.transform = "translateX(0%)";
        twoFactorContainer.current.style.backgroundColor = "red";
      }
    } else if(ref === "push") {
      if(push.current.style.transform === "translateX(0%)" || push.current.style.transform === "") {
        push.current.style.transform = "translateX(160%)";
        pushContainer.current.style.backgroundColor = "green";
      } else {
        push.current.style.transform = "translateX(0%)";
        pushContainer.current.style.backgroundColor = "red";
      }
    } else if(ref === "desktop") {
      if(desktop.current.style.transform === "translateX(0%)" || desktop.current.style.transform === "") {
        desktop.current.style.transform = "translateX(160%)";
        desktopContainer.current.style.backgroundColor = "green";
      } else {
        desktop.current.style.transform = "translateX(0%)";
        desktopContainer.current.style.backgroundColor = "red";
      }
    } else if(ref === "email") {
      if(email.current.style.transform === "translateX(0%)" || email.current.style.transform === "") {
        email.current.style.transform = "translateX(160%)";
        emailContainer.current.style.backgroundColor = "green";
      } else {
        email.current.style.transform = "translateX(0%)";
        emailContainer.current.style.backgroundColor = "red";
      }
    }
  }

  return (
    <div className='setting-container'>
      <div className="appearance">
        <div className="left-appearance">
          <h4>Appearance</h4>
          <span>Customize how your theme looks on your device</span>
        </div>
        <div className="right-appearance">
          <ChangeThemeBoxHandling isSetting={true} />
        </div>
      </div>
      <div className="two-factor">
        <div className="left-appearance">
          <h4>Two Factor Authentications</h4>
          <span>Keep Your Account Secure by enabling 2FA via email</span>
        </div>
        <div className="right-section-setting">
          <div ref={twoFactorContainer} onClick={() => handleToggle("two-factor")}  className="toggle-setting">
            <div ref={twoFactor} className="toggle-scroll"></div>
          </div>
        </div>
      </div>
      <div className="push-notification">
        <div className="left-appearance">
          <h4>Push Notifications</h4>
          <span>Recive Push Notification</span>
        </div>
        <div className="right-section-setting">
          <div ref={pushContainer} onClick={() => handleToggle("push")}  className="toggle-setting">
            <div ref={push} className="toggle-scroll"></div>
          </div>
        </div>
      </div>
      <div className="desktop-notification">
        <div className="left-appearance">
          <h4>Desktop Notifications</h4>
          <span>Recive push notification in desktop</span>
        </div>
        <div className="right-section-setting">
          <div ref={desktopContainer} onClick={() => handleToggle("desktop")}  className="toggle-setting">
            <div ref={desktop} className="toggle-scroll"></div>
          </div>
        </div>
      </div>
      <div className="email-notification">
        <div className="left-appearance">
          <h4>Email Notifications</h4>
          <span>Recive email notifications</span>
        </div>
        <div className="right-section-setting">
          <div ref={emailContainer} onClick={() => handleToggle("email")}  className="toggle-setting">
            <div ref={email} className="toggle-scroll"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
