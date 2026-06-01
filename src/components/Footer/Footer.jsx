import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="top-footer-section">
          <div className="address-company-footer">
            <div className="logo-section-footer">
              <img src="logo.svg" height={35} alt="Logo" />
              <h1>Crimba</h1>
            </div>
            <div className="phone-number-section-footer">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24">
                <path d="M14 2C14 2 16.2 2.2 19 5C21.8 7.8 22 10 22 10" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M14.207 5.53564C14.207 5.53564 15.197 5.81849 16.6819 7.30341C18.1668 8.78834 18.4497 9.77829 18.4497 9.77829" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4.00655 7.93309C3.93421 9.84122 4.41713 13.0817 7.6677 16.3323C8.45191 17.1165 9.23553 17.7396 10 18.2327M5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C15.2529 20.0243 14.1963 19.9541 13 19.6111" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>(704) 555-0127</span>
            </div>
            <div className="email-section-footer">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24">
                <g id="style=linear">
                <g id="email">
                <path id="vector" d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path id="vector_2" d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688" strokeWidth="1.5" strokeLinecap="round"/>
                </g>
                </g>
              </svg>
              <span>crimba@example.com</span>
            </div>
            <div className="address-section-footer">
              <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" height="50px" viewBox="-3 0 32 32" version="1.1">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                  <g transform="translate(-155.000000, -411.000000)">
                    <path d="M176.537,428.822 C176.38,428.925 176.202,429 176,429 L158,429 C157.448,429 157,428.553 157,428 L157,420 C157,419.448 157.448,419 158,419 L176,419 C176.213,419 176.399,419.081 176.561,419.194 L178.963,423.984 L176.537,428.822 L176.537,428.822 Z M169,439 C169,440.104 168.104,441 167,441 L165,441 C163.896,441 163,440.104 163,439 L163,431 L169,431 L169,439 L169,439 Z M163,415 C163,413.896 163.896,413 165,413 L167,413 C168.104,413 169,413.896 169,415 L169,417 L163,417 L163,415 L163,415 Z M180.717,423.224 L177.737,417.282 C177.524,417.069 177.241,416.982 176.962,417 L171,417 L171,415 C171,412.791 169.209,411 167,411 L165,411 C162.791,411 161,412.791 161,415 L161,417 L157,417 C155.896,417 155,417.896 155,419 L155,429 C155,430.104 155.896,431 157,431 L161,431 L161,439 C161,441.209 162.791,443 165,443 L167,443 C169.209,443 171,441.209 171,439 L171,431 L177,431 L177,430.976 C177.266,430.982 177.534,430.89 177.737,430.688 L180.717,424.745 C180.942,424.325 180.972,424.188 181.002,423.984 C181.016,423.711 180.927,423.604 180.717,423.224 L180.717,423.224 Z">
                    </path>
                  </g>
                </g>
              </svg>
              <span>3891 Ranchview Dr. Richardson, California 62639</span>
            </div>
          </div>
          <div className="information-company-footer">
            <ul className='information-section-footer'>
              <li className='footer-information-option footer-information-option-header'>Information</li>
              <li className='footer-information-option'>
                <Link to='/'>My Account </Link></li>
              <li className='footer-information-option'>
                <Link to='/'>Login </Link></li>
              <li className='footer-information-option'>
                <Link to='/'>My Card </Link></li>
              <li className='footer-information-option'>
                <Link to='/'>My Wishlist </Link></li>
              <li className='footer-information-option'>
                <Link to='/'>Checkout </Link></li>
            </ul>
          </div>
          <div className="service-company-footer">
            <ul className='information-section-footer'>
              <li className='footer-service-option footer-service-option-header'>Service</li>
              <li className='footer-service-option'>
                <Link to='/'>About Us</Link></li>
              <li className='footer-service-option'>
                <Link to='/'>Careers</Link></li>
              <li className='footer-service-option'>
                <Link to='/'>Delivery Information</Link></li>
              <li className='footer-service-option'>
                <Link to='/'>Privacy Policy</Link></li>
              <li className='footer-service-option'>
                <Link to='/'>Terms & Conditions</Link></li>
            </ul>
          </div>
          <div className="subscribe-company-footer">
            <h3>Subscribe</h3>
            <p>Enter your email below to be the first to know about new collections and product launches.</p>
            <div className="email-form-footer">
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="20px" viewBox="0 0 24 24" fill="none">
                <g id="style=linear">
                <g id="email">
                <path id="vector" d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path id="vector_2" d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
                </g>
                </g>
              </svg>
              <div className="email-form-section-footer">
                <label htmlFor="email-contract">Your Email</label>
                <input type="text" id='email-contract' placeholder='' />
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="bottom-footer-section">
          {/* <div className="left-bottom-section">
            <div className="creadit-card-container">
              <svg viewBox="0 -140 780 780" enableBackground="new 0 0 780 500" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
                <path d="m293.2 348.73l33.359-195.76h53.358l-33.384 195.76h-53.333zm246.11-191.54c-10.569-3.966-27.135-8.222-47.821-8.222-52.726 0-89.863 26.551-90.181 64.604-0.297 28.129 26.515 43.822 46.754 53.185 20.771 9.598 27.752 15.716 27.652 24.283-0.133 13.123-16.586 19.115-31.924 19.115-21.355 0-32.701-2.967-50.225-10.273l-6.878-3.111-7.487 43.822c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885 0.199-22.27-14.016-39.215-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.446-0.271 30.088 3.534 39.936 7.5l4.781 2.259 7.231-42.427m137.31-4.223h-41.23c-12.772 0-22.332 3.486-27.94 16.234l-79.245 179.4h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555 0.084 68.336 0.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512l-43.187-195.64zm-65.417 126.41c4.414-11.279 21.26-54.724 21.26-54.724-0.314 0.521 4.381-11.334 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.527h-44.293v3e-3zm-363.3-126.41l-52.239 133.5-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.2 56.455-0.063 84.004-195.39-56.524-1e-3" fill="#0E4595"/>
                <path d="m146.92 152.96h-86.041l-0.682 4.073c66.939 16.204 111.23 55.363 129.62 102.42l-18.709-89.96c-3.229-12.396-12.597-16.096-24.186-16.528" fill="#F2AE14"/>
              </svg>
            </div>
            <div className="creadit-card-container">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 291.791 291.791" xmlSpace="preserve">
                <g>
                  <path style={{fill: "#E2574C"}} d="M182.298,145.895c0,50.366-40.801,91.176-91.149,91.176S0,196.252,0,145.895
                    s40.811-91.176,91.149-91.176S182.298,95.538,182.298,145.895z"/>
                  <path style={{fill: "#F4B459"}} d="M200.616,54.719c-20.442,0-39.261,6.811-54.469,18.181l0.073,0.009
                    c2.991,2.89,6.291,4.924,8.835,8.251l-18.965,0.301c-2.972,3-5.68,6.264-8.233,9.656H161.3c2.544,3.054,4.896,5.708,7.03,9.081
                    h-46.536c-1.705,2.936-3.282,5.954-4.659,9.09h56.493c1.477,3.127,2.799,5.489,3.921,8.799h-63.76
                    c-1.012,3.146-1.878,6.364-2.535,9.646h68.966c0.675,3.155,1.194,6.072,1.55,9.045h-71.884c-0.301,3-0.456,6.045-0.456,9.118
                    h72.859c0,3.228-0.228,6.218-0.556,9.118h-71.847c0.31,3.091,0.766,6.127,1.368,9.118h68.856c-0.711,2.954-1.532,5.926-2.562,9.008
                    h-63.969c0.966,3.118,2.143,6.145,3.428,9.099h56.621c-1.568,3.319-3.346,5.972-5.306,9.081h-46.691
                    c1.842,3.191,3.875,6.236,6.081,9.154l33.589,0.501c-2.863,3.437-6.537,5.507-9.884,8.516c0.182,0.146-5.352-0.018-16.248-0.191
                    c16.576,17.105,39.744,27.772,65.446,27.772c50.357,0,91.176-40.82,91.176-91.176S250.981,54.719,200.616,54.719z"/>
                </g>
              </svg>
            </div>
            <div className="creadit-card-container">
              <svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.413 16.415c0.041-0.003 0.088-0.004 0.136-0.004 0.491 0 0.945 0.156 1.315 0.421l-0.007-0.005c-0 0.484-0.212 0.918-0.548 1.215l-0.002 0.002c-0.319 0.319-0.759 0.517-1.246 0.517h-0c-0.008 0-0.017 0-0.026 0-0.317 0-0.609-0.109-0.839-0.292l0.003 0.002c-0.223-0.163-0.366-0.423-0.366-0.717 0-0.002 0-0.004 0-0.006v0c0.005-0.339 0.183-0.636 0.45-0.806l0.004-0.002c0.296-0.204 0.662-0.326 1.056-0.326 0.024 0 0.048 0 0.072 0.001l-0.003-0zM25.095 13.456l2.432 5.526-1.372 2.974h1.143l3.698-8.501h-1.206l-1.709 4.237h-0.025l-1.757-4.236zM22.267 13.263c-0.047-0.003-0.102-0.005-0.157-0.005-0.918 0-1.729 0.455-2.22 1.152l-0.006 0.009 0.976 0.614c0.306-0.474 0.831-0.783 1.429-0.783 0.014 0 0.028 0 0.041 0.001l-0.002-0c0.006-0 0.012-0 0.019-0 0.405 0 0.774 0.153 1.052 0.405l-0.001-0.001c0.28 0.233 0.457 0.582 0.457 0.972 0 0.003 0 0.007-0 0.010v-0.001 0.252c-0.435-0.229-0.95-0.364-1.497-0.364-0.045 0-0.089 0.001-0.134 0.003l0.006-0c-0.044-0.002-0.097-0.004-0.149-0.004-0.638 0-1.228 0.205-1.708 0.552l0.009-0.006c-0.423 0.323-0.693 0.827-0.693 1.394 0 0.022 0 0.043 0.001 0.065l-0-0.003c-0 0.010-0 0.022-0 0.034 0 0.565 0.254 1.070 0.654 1.409l0.003 0.002c0.415 0.36 0.96 0.58 1.557 0.58 0.026 0 0.052-0 0.078-0.001l-0.004 0c0.008 0 0.017 0 0.026 0 0.76 0 1.427-0.401 1.8-1.003l0.005-0.009h0.047v0.818h1.060v-3.635c0.002-0.036 0.003-0.078 0.003-0.121 0-0.659-0.273-1.254-0.712-1.678l-0.001-0.001c-0.477-0.41-1.103-0.66-1.787-0.66-0.053 0-0.106 0.002-0.159 0.005l0.007-0zM17.113 11.795c0.406 0.007 0.77 0.181 1.028 0.455l0.001 0.001c0.267 0.271 0.432 0.643 0.432 1.053 0 0.828-0.672 1.5-1.5 1.5-0.010 0-0.020-0-0.030-0l0.002 0h-1.858v-3.009h1.858q0.034-0.001 0.067 0zM14.081 10.733v8.623h1.107v-3.493h1.831c0.020 0.001 0.044 0.001 0.068 0.001 0.712 0 1.358-0.28 1.835-0.737l-0.001 0.001c0.489-0.457 0.794-1.105 0.794-1.824s-0.305-1.368-0.792-1.823l-0.001-0.001c-0.477-0.463-1.129-0.748-1.847-0.748-0.019 0-0.038 0-0.058 0.001l0.003-0zM5.957 10.045c-2.735 0-4.953 2.218-4.953 4.953s2.218 4.953 4.953 4.953v0c0.039 0.001 0.085 0.002 0.132 0.002 1.212 0 2.317-0.454 3.156-1.202l-0.005 0.004c0.911-0.882 1.477-2.117 1.477-3.483 0-0.056-0.001-0.113-0.003-0.169l0 0.008c-0-0.356-0.032-0.705-0.093-1.043l0.005 0.036h-4.669v1.907h2.674c-0.116 0.632-0.477 1.163-0.979 1.501l-0.008 0.005c-0.459 0.301-1.022 0.48-1.627 0.48-1.655 0-2.996-1.341-2.996-2.996 0-1.633 1.307-2.961 2.932-2.995l0.003-0c0.013-0 0.029-0 0.044-0 0.72 0 1.374 0.283 1.857 0.744l-0.001-0.001 1.415-1.412c-0.849-0.8-1.997-1.291-3.259-1.291-0.019 0-0.039 0-0.058 0l0.003-0z"></path>
              </svg>
            </div>
            <div className="creadit-card-container">
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve">
                <path style={{fill:"none", stroke:"#000000", strokeWidth:"2",strokeMiterlimit:"10"}} d="M27,25H5c-1.105,0-2-0.895-2-2V9
                  c0-1.105,0.895-2,2-2h22c1.105,0,2,0.895,2,2v14C29,24.105,28.105,25,27,25z"/>
                <path fill="#0000ff" d="M15.175,13.25L13.8,16.962l-1.375-3.712H10.5v5.225L8.575,13.25H7.062L5,18.75h1.238l0.413-1.237h2.338L9.4,18.75h2.337
                  v-4.125l1.513,4.125h1.1l1.513-3.987v3.987h1.1v-5.5H15.175z M7.062,16.275L7.75,14.35l0.688,1.925H7.062z"/>
                <path fill="#0000ff" d="M24.938,16L27,13.25h-1.513l-1.375,1.65l-1.1-1.65h-4.538v5.5h4.4l1.375-1.788l1.375,1.788H27L24.938,16z M22.188,17.65
                h-2.612v-1.1h2.475v-1.1h-2.475v-0.962h2.75l1.1,1.513L22.188,17.65z"/>
              </svg>
            </div>
            <div className="creadit-card-container">
              <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve">
                <g>
                  <path d="M12,26H7c-0.8,0-1.6-0.4-2.1-1c-0.5-0.6-0.7-1.4-0.5-2.2L8.7,4l0,0c0.3-1.2,1.3-2,2.6-2h8.6c2.3,0,4.4,1,5.9,2.8
                    c1.4,1.8,2,4.1,1.5,6.4c-0.8,4-4.4,6.8-8.5,6.8h-3.2c-0.5,0-1,0.4-1.1,0.9L13,25.2C12.9,25.7,12.5,26,12,26z"/>
                </g>
                <g>
                  <g>
                    <path style={{fill: "#01308A"}} d="M12,26H7c-0.8,0-1.6-0.4-2.1-1c-0.5-0.6-0.7-1.4-0.5-2.2L8.7,4l0,0c0.3-1.2,1.3-2,2.6-2h8.6
                      c2.3,0,4.4,1,5.9,2.8c1.4,1.8,2,4.1,1.5,6.4c-0.8,4-4.4,6.8-8.5,6.8h-3.2c-0.5,0-1,0.4-1.1,0.9L13,25.2C12.9,25.7,12.5,26,12,26z"
                      />
                  </g>
                </g>
                <path style={{fill: "#019CDE"}} d="M29.3,11.3c0,0.1,0,0.2,0,0.3c-1,4.9-5.4,8.4-10.4,8.4h-2.5l-1.4,5.7C14.6,27.1,13.4,28,12,28h-2
                  c0.1,0.4,0.2,0.7,0.5,1c0.5,0.6,1.2,0.9,2,0.9H17c0.5,0,0.9-0.3,1-0.7l1.4-5.5c0.1-0.4,0.5-0.6,0.9-0.6h2.9c3.7,0,7-2.5,7.7-6
                  C31.3,15,30.7,12.8,29.3,11.3z"/>
              </svg>
            </div>
          </div> */}
          <div className="center-bottom-section">
            ©2023 Crimba All Rights all Reserved
          </div>
          <div className="right-bottom-section">
            <div className="social-media-logo">
              <svg height="35px" viewBox="0 0 24 24" id="facebook" xmlns="http://www.w3.org/2000/svg" className="icon flat-color">
                <path id="primary" d="M14,6h3a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H14A5,5,0,0,0,9,7v3H7a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1H9v7a1,1,0,0,0,1,1h2a1,1,0,0,0,1-1V14h2.22a1,1,0,0,0,1-.76l.5-2a1,1,0,0,0-1-1.24H13V7A1,1,0,0,1,14,6Z">
                </path>
              </svg>
            </div>
            <div className="social-media-logo">
              <svg version="1.1" height={35} id="Icons" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xmlSpace="preserve">
                <path style={{fill:"none",stroke:"#ffffff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10"}} d="M23,31H9c-4.4,0-8-3.6-8-8V9c0-4.4,3.6-8,8-8h14c4.4,0,8,3.6,8,8v14C31,27.4,27.4,31,23,31z"/>
                <circle style={{fill:"none",stroke:"#ffffff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10"}} cx="16" cy="16" r="7"/>
                <circle style={{fill:"none",stroke:"#ffffff",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",strokeMiterlimit:"10"}} cx="24" cy="7" r="1"/>
              </svg>
            </div>
            <div className="social-media-logo">
              <svg height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon flat-color">
                <path id="primary" d="M21.63,6.92a1,1,0,0,0-.83-.2,8.31,8.31,0,0,1-1.1.17,4.49,4.49,0,0,0-8.55.52c-2.73.67-5.4-2.07-5.43-2.1a1,1,0,0,0-1-.27,1,1,0,0,0-.7.8,11.69,11.69,0,0,0,1.51,8.67A7.25,7.25,0,0,1,3,15a1,1,0,0,0-.89,1.46C2.3,16.83,4.18,20,11.58,20c5.84,0,8-5.2,8.36-8.38A4,4,0,0,0,22,7.7,1,1,0,0,0,21.63,6.92Z">
                </path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
