import { useEffect, useRef, useState } from 'react';
import './Comments.css';
import { Link } from 'react-router-dom';

export default function Comments() {
  const containerRef = useRef(null);
  const [items, setItems] = useState([{
    firstname : 'John',
    lastname : 'Doe',
    userType : 'Graohist',
    id : 1,
    title : "Men Wear",
    img : "main-images/category-main-images/man-wear.png",
    stars : 15
  }, 
  {
    firstname : 'Maria',
    lastname : 'Oaly',
    userType : 'Developer',
    id : 2,
    title : "Women Wear",
    img : "main-images/category-main-images/woman-wear.png",
    stars : 20
  }, 
  {
    firstname : 'Walter',
    lastname : 'White',
    userType : 'Drog dealer',
    id : 3,
    title : "Kids Wear",
    img : "main-images/category-main-images/kids-wear.png",
    stars : 45
  }, 
  {
    firstname : 'Hunt',
    lastname : 'Karray',
    userType : 'Cashier',
    id : 4,
    title : "Bags",
    img : "main-images/category-main-images/bags.png",
    stars : 30
  }, 
  {
    firstname : 'Koal',
    lastname : 'Boj',
    userType : 'Driver',
    id : 5,
    title : "Belts",
    img : "main-images/category-main-images/belts.png",
    stars : 35
  }, 
  {
    firstname : 'Lim',
    lastname : 'Jert',
    userType : 'Leader',
    id : 6,
    title : "Watches",
    img : "main-images/category-main-images/watches.png",
    stars : 35
  }, 
  {
    firstname : 'Trever',
    lastname : '',
    userType : 'Seller',
    id : 7,
    title : "Accessories",
    img : "main-images/category-main-images/accessories.png",
    stars : 10
  }, 
  {
    firstname : 'Michel',
    lastname : '',
    userType : 'Theif',
    id : 8,
    title : "Winter Wear",
    img : "main-images/category-main-images/winter-wear.png",
    stars : 25
  }]);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const CARD_WIDTH = 400;
  const GAP = 16;
  const SCROLL_STEP = CARD_WIDTH + GAP;

  const goNext = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: SCROLL_STEP,
      behavior: 'smooth'
    });
  };

  const goPrev = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({
      left: -SCROLL_STEP,
      behavior: 'smooth'
    });
  };

  const checkButtons = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    setCanGoPrev(scrollLeft > 5);
    setCanGoNext(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    checkButtons();

    container.addEventListener('scroll', checkButtons);
    window.addEventListener('resize', checkButtons);

    return () => {
      container.removeEventListener('scroll', checkButtons);
      window.removeEventListener('resize', checkButtons);
    };
  }, []);

  return (
    <div className='comments-main-container'>
      <div className='comments-main'>
        <div className="comments-header">
          <div className="title-comments">
            <h1>Shop by Categories</h1>
          </div>
          <div className="change-comments">
            <button disabled={!canGoPrev} onClick={goPrev} className="go-back">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
              </svg>
            </button>
            <button disabled={!canGoNext} onClick={goNext} className="go-next">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
              </svg>
            </button>
          </div>
        </div>
        <ul ref={containerRef} className="comments-container">
          {items.map(item => {
            return (
              <li key={item.id} className="card-container-comments">
                <div className="top-stars">
                  <img src={`main-images/stars/${item.stars}.svg`} alt="stars" />
                </div>
                <div className="middle-content-comment">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, nisi quas excepturi dignissimos quo reprehenderit dolore eos sed ab, similique beatae unde quasi neque vitae quaerat commodi consequuntur tempora impedit.
                  Natus qui nam nulla amet, et porro accusamus, corporis eligendi sunt optio voluptatibus explicabo sint quia praesentium excepturi adipisci blanditiis quam voluptatem numquam ipsam similique possimus deserunt saepe vitae. Adipisci!
                  Nostrum culpa enim cupiditate sit? Consectetur dolorum in quo facilis soluta incidunt eius ducimus dolores error similique saepe illum ullam suscipit doloremque, quidem quibusdam hic fuga rem repudiandae corporis deserunt.</p>
                </div>
                <div className="profile-comments">
                  <div className="profile-image">
                    <img src="main-images/banner-main-images/banner.jpg" alt="profile" />
                  </div>
                  <div className="contact-info">
                    <h2>{item.firstname + ' ' + item.lastname}</h2>
                    <h3>{item.userType}</h3>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
