import './ProductDetail.css';

export default function ProductDetail() {
  return (
    <div className='product-detail-container'>
      <div className="image-shower">
        <img src="main-images/products/01.png" alt="Product" />
      </div>
      <div className="detail-shower">
        <div className="title-product">
          <h1>YK Disney</h1>
          <h3>Girls Pink Moana Printed Dress</h3>
        </div>
        <div className="star-rating">
          <img src="main-images/stars/50.svg" alt="star-rating" />
          <p>5.0 {`(${121}) Reviews`}</p>
        </div>
        <div className="price-container">
          <p className='after-discount'>$80.00</p>
          <p className='before-discount'>$100.00</p>
        </div>
        <div className="description-container">
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters
          </p>
        </div>
        <div className="color-section">
          <h2>Color</h2>
          <div className="color-container">
            <span className='red-color'></span>
            <span className='blue-color'></span>
            <span className='orange-color'></span>
            <span className='black-color'></span>
            <span className='green-color'></span>
            <span className='yellow-color'></span>
          </div>
        </div>
        <div className="size-section">
          <h2>Size</h2>
          <div className="size-container">
            <span className='s-size'>S</span>
            <span className='m-size'>M</span>
            <span className='l-size'>L</span>
            <span className='xl-size'>XL</span>
            <span className='xxl-size'>XXL</span>
          </div>
        </div>
        <div className="operation-container">
          <div className="count-controller">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none">
              <path d="M6 12H18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>            
            <p>1</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none">
              <path d="M12 6V18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 12H18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="add-to-cart-PV">
            <button className='add-to-cart-btn-PV'>
              Add To Cart
            </button>
          </div>
          <div className="add-to-favorite-PV">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
