import "./AddReview.css";

export default function AddReview() {
  return (
    <div className="main-add-review-container">
      <h2>Add your Review</h2>
      <div className="rating-container">
        <h4>Your Rating</h4>
        <div className="rating">
          <img src="main-images/stars/10-stroke.svg" height={24} alt="star-stroke" />
          <img src="main-images/stars/20-stroke.svg" height={24} alt="star-stroke" />
          <img src="main-images/stars/30-stroke.svg" height={24} alt="star-stroke" />
          <img src="main-images/stars/40-stroke.svg" height={24} alt="star-stroke" />
          <img src="main-images/stars/50-stroke.svg" height={24} alt="star-stroke" />
        </div>
      </div>
      <div className="review-detail">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Enter Your Name" />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="Enter Your Email" />
        <label htmlFor="review">Your Review</label>
        <textarea type="text" id="review" placeholder="Enter Your Review" />
      </div>
      <div className="submit-review">
        <button className="btn-submit-review">Submit</button>
      </div>
    </div>
  );
}
