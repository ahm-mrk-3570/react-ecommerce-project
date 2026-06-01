import { useEffect, useRef, useState } from 'react';
import './MainCategory.css';
import { Link } from 'react-router-dom';

const items = [
  {
    id : 1,
    title : "Men Wear",
    img : "main-images/category-main-images/man-wear.png"
  }, 
  {
    id : 2,
    title : "Women Wear",
    img : "main-images/category-main-images/woman-wear.png"
  }, 
  {
    id : 3,
    title : "Kids Wear",
    img : "main-images/category-main-images/kids-wear.png"
  }, 
  {
    id : 4,
    title : "Bags",
    img : "main-images/category-main-images/bags.png"
  }, 
  {
    id : 5,
    title : "Belts",
    img : "main-images/category-main-images/belts.png"
  }, 
  {
    id : 6,
    title : "Watches",
    img : "main-images/category-main-images/watches.png"
  }, 
  {
    id : 7,
    title : "Accessories",
    img : "main-images/category-main-images/accessories.png"
  }, 
  {
    id : 8,
    title : "Winter Wear",
    img : "main-images/category-main-images/winter-wear.png"
  }
];

export default function MainCategory() {
  const containerRef = useRef(null);
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
    <div className='category-main'>
      <div className="category-header">
        <div className="title-category">
          <h1>Shop by Categories</h1>
        </div>
        <div className="change-category">
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
      <ul ref={containerRef} className="category-container">
        {items.map(item => {
          return (
            <li  key={item.id} className="card-container">
              <div className='card-category-item'>
                <img src={item.img} alt={item.title} />
                <div className='card-detail'>
                  <Link to='/'>
                    <button className='category-button'>
                      {item.title}
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
