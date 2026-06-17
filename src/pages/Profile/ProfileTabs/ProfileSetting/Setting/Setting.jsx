/* eslint-disable react-hooks/set-state-in-effect */
import { useContext, useEffect, useState } from "react";
import ChangeThemeBoxHandling from "../../../../../components/ChangeThemeBoxHandling";
import "./Setting.css";
import { supabase } from "../../../../../lib/supabase";
import AuthContext from "../../../../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// ── Defined outside to avoid re-render / focus issues ──
const Toggle = ({ checked, onToggle }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={onToggle}
    className={`ps-toggle ${checked ? "ps-toggle--on" : ""}`}
  >
    <span className="ps-toggle__thumb" />
  </button>
);

const SettingRow = ({ icon, title, description, right }) => (
  <div className="ps-row">
    <div className="ps-row__icon">{icon}</div>
    <div className="ps-row__text">
      <p className="ps-row__title">{title}</p>
      <p className="ps-row__desc">{description}</p>
    </div>
    <div className="ps-row__right">{right}</div>
  </div>
);

const DEFAULTS = {
  theme: "dark",
  two_factor: false,
  push_notifications: true,
  desktop_notifications: true,
  email_notifications: true,
};

export default function Setting() {
  const { user, setUser } = useContext(AuthContext);
  const [settings, setSettings] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error);
      return;
    }

    // اختیاری
    localStorage.removeItem("checkout");

    // اگر state داری
    setUser(null);

    // انتقال به صفحه لاگین
    navigate("/login");
  };

  // Load from user_metadata
  useEffect(() => {
    if (!user) return;
    const meta = user.user_metadata || {};
    setSettings((prev) => ({ ...prev, ...meta }));
  }, [user]);

  const saveSettings = async (updated) => {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ data: updated });
    setSaving(false);
    if (error) toast.error("Failed to save settings");
  };

  const handleToggle = async (key) => {
    const updated = { ...settings, [key]: !settings[key] };
    setSettings(updated);
    await saveSettings(updated);
  };

  const handleTheme = async (theme) => {
    const updated = { ...settings, theme };
    setSettings(updated);
    await saveSettings(updated);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const handleChangePassword = async () => {
    if (!user?.email) return;
    const { error } = await supabase.auth.resetPasswordForEmail(user.email);
    if (error) toast.error(error.message);
    else toast.success("Password reset link sent to your email");
  };

  return (
    <div className="ps-page">
      {/* ── Account & Security ── */}
      <section className="ps-section">
        <h3 className="ps-section__title">Account & Security</h3>

        <SettingRow
          icon={<i className="ti ti-lock" aria-hidden="true" />}
          title="Change Password"
          description="Send a reset link to your email"
          right={
            <button className="ps-action-btn" onClick={handleChangePassword}>
              Send link
            </button>
          }
        />

        <SettingRow
          icon={<i className="ti ti-shield-check" aria-hidden="true" />}
          title="Two-Factor Authentication"
          description="Add a second layer of protection via email OTP"
          right={
            <Toggle
              checked={settings.two_factor}
              onToggle={() => handleToggle("two_factor")}
            />
          }
        />
      </section>

      {/* ── Appearance ── */}
      <section className="ps-section">
        <h3 className="ps-section__title">Appearance</h3>

        <div className="ps-row">
          <div className="ps-row__icon">
            <i className="ti ti-palette" aria-hidden="true" />
          </div>
          <div className="ps-row__text">
            <p className="ps-row__title">Theme</p>
            <p className="ps-row__desc">
              Choose how Crimba looks on your device
            </p>
          </div>
          <div className="ps-theme-btns">
            {["dark", "light", "system"].map((t) => (
              <button
                key={t}
                className={`ps-theme-btn ${settings.theme === t ? "ps-theme-btn--active" : ""}`}
                onClick={() => handleTheme(t)}
              >
                <i
                  className={`ti ti-${t === "dark" ? "moon" : t === "light" ? "sun" : "device-laptop"}`}
                  aria-hidden="true"
                />
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Notifications ── */}
      <section className="ps-section">
        <h3 className="ps-section__title">Notifications</h3>

        <SettingRow
          icon={<i className="ti ti-mail" aria-hidden="true" />}
          title="Email Notifications"
          description="Receive order updates and promotions by email"
          right={
            <Toggle
              checked={settings.email_notifications}
              onToggle={() => handleToggle("email_notifications")}
            />
          }
        />

        <SettingRow
          icon={<i className="ti ti-bell" aria-hidden="true" />}
          title="Push Notifications"
          description="Get notified about orders and activity"
          right={
            <Toggle
              checked={settings.push_notifications}
              onToggle={() => handleToggle("push_notifications")}
            />
          }
        />

        <SettingRow
          icon={<i className="ti ti-device-desktop" aria-hidden="true" />}
          title="Desktop Notifications"
          description="Show notifications on your desktop"
          right={
            <Toggle
              checked={settings.desktop_notifications}
              onToggle={() => handleToggle("desktop_notifications")}
            />
          }
        />
      </section>

      {/* ── Danger Zone ── */}
      <section className="ps-section ps-section--danger">
        <h3 className="ps-section__title">Account</h3>

        <div className="ps-row">
          <div className="ps-row__icon ps-row__icon--danger">
            <i className="ti ti-logout" aria-hidden="true" />
          </div>
          <div className="ps-row__text">
            <p className="ps-row__title">Sign Out</p>
            <p className="ps-row__desc">Sign out of your Crimba account</p>
          </div>
          <button className="ps-logout-btn" onClick={logout}>
            Sign out
          </button>
        </div>

        <div className="ps-row">
          <div className="ps-row__icon ps-row__icon--danger">
            <i className="ti ti-trash" aria-hidden="true" />
          </div>
          <div className="ps-row__text">
            <p className="ps-row__title ps-row__title--danger">
              Delete Account
            </p>
            <p className="ps-row__desc">
              Permanently delete your account and all data
            </p>
          </div>
          <button className="ps-delete-btn">Delete</button>
        </div>
      </section>

      {saving && <p className="ps-saving">Saving…</p>}
    </div>
  );
}

{
  /* <div className='setting-container'>
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
  <button onClick={handleLogout} className='logout-btn'>
    Logout
  </button>
</div> */
}

// const [twoFactorAuth, setTwoFactorAuth] = useState(localStorage.getItem('twoFactorAuth') || false);
// const [pushNotif, setPushNotif] = useState(localStorage.getItem('pushNotif') || false);
// const [desktopNotif, setDesktopNotif] = useState(localStorage.getItem('desktopNotif') || false);
// const [emailNotif, setEmailNotif] = useState(localStorage.getItem('emailNotif') || false);

// const navigate = useNavigate();

// const { setUser } = useContext(AuthContext);

// const twoFactor = useRef();
// const push = useRef();
// const desktop = useRef();
// const email = useRef();
// const twoFactorContainer = useRef();
// const pushContainer = useRef();
// const desktopContainer = useRef();
// const emailContainer = useRef();

// const handleToggle = (ref) => {
//   if(ref === "two-factor") {
//     if(twoFactor.current.style.transform === "translateX(0%)" || twoFactor.current.style.transform === "") {
//       twoFactor.current.style.transform = "translateX(160%)";
//       twoFactorContainer.current.style.backgroundColor = "green";
//     } else {
//       twoFactor.current.style.transform = "translateX(0%)";
//       twoFactorContainer.current.style.backgroundColor = "red";
//     }
//   } else if(ref === "push") {
//     if(push.current.style.transform === "translateX(0%)" || push.current.style.transform === "") {
//       push.current.style.transform = "translateX(160%)";
//       pushContainer.current.style.backgroundColor = "green";
//     } else {
//       push.current.style.transform = "translateX(0%)";
//       pushContainer.current.style.backgroundColor = "red";
//     }
//   } else if(ref === "desktop") {
//     if(desktop.current.style.transform === "translateX(0%)" || desktop.current.style.transform === "") {
//       desktop.current.style.transform = "translateX(160%)";
//       desktopContainer.current.style.backgroundColor = "green";
//     } else {
//       desktop.current.style.transform = "translateX(0%)";
//       desktopContainer.current.style.backgroundColor = "red";
//     }
//   } else if(ref === "email") {
//     if(email.current.style.transform === "translateX(0%)" || email.current.style.transform === "") {
//       email.current.style.transform = "translateX(160%)";
//       emailContainer.current.style.backgroundColor = "green";
//     } else {
//       email.current.style.transform = "translateX(0%)";
//       emailContainer.current.style.backgroundColor = "red";
//     }
//   }
// }

// const handleLogout = async () => {
//   const { error } = supabase.auth.signOut();

//   if(!error) {
//     setUser(null);
//     navigate('/');
//   }
// }
