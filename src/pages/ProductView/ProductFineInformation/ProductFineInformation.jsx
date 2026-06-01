import { useRef } from 'react';
import AddReview from '../../../components/AddReview/AddReview';
import CommentReview from '../../../components/CommentReview/CommentReview';
import './ProductFineInformation.css';

export default function ProductFineInformation() {
  const desc_section = useRef(null);
  const additional_section = useRef(null);
  const review_section = useRef(null);

  const handleFrag = (sec) => {
    if(sec === "description") {
      additional_section.current.style.display = "none";
      review_section.current.style.display = "none";
      desc_section.current.style.display = "flex";
    } else if(sec === "additional") {
      desc_section.current.style.display = "none";
      review_section.current.style.display = "none";
      additional_section.current.style.display = "flex";
    } else if(sec === "review") {
      additional_section.current.style.display = "none";
      desc_section.current.style.display = "none";
      review_section.current.style.display = "inline";
    } else {
      additional_section.current.style.display = "none";
      review_section.current.style.display = "none";
      desc_section.current.style.display = "flex";
    }
  }

  return (
    <div className='product-fine-information'>
      <div className='product-fine-information-main'>
        <div className="header-product-fine-info">
          <div className="description-fine" onClick={() => handleFrag('description')}>
            Description
          </div>
          <div className="additional-fine" onClick={() => handleFrag('additional')}>
            Additional Information
          </div>
          <div className="review-fine" onClick={() => handleFrag('review')}>
            Reviews
          </div>
        </div>
        <div className="container-product-fine-info">
          <div ref={desc_section} className="description-main-fine">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
          </div>
          <div ref={additional_section} className="additional-main-fine">
            <div className='additional-container-item'>
              <p>Color </p>
              <span>Red, Blue, Orange, Black, Green, Yellow</span>
            </div>
            <div className='additional-container-item'>
              <p>Size </p>
              <span>S, M, L, XL, XXL</span>
            </div>
          </div>
          <div ref={review_section} className="review-main-fine">
            <h2>Customer Reviews</h2>
            <CommentReview />
            <CommentReview />
            <AddReview />
          </div>
        </div>
      </div>
    </div>
  )
}
