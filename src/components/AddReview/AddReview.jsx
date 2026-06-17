import { ErrorMessage, Field, Form, Formik } from "formik";

import { reviewValidation } from "../../validation/reviewValidation";

import "./AddReview.css";
import { useContext, useState } from "react";
import { supabase } from "../../lib/supabase";
import { toast } from "react-toastify";
import GlobalContext from "../../context/Context";
import AuthContext from "../../context/AuthContext";

export default function AddReview({ product, setReviews }) {
  const [ratingStar, setRatingStar] = useState(null);
  const { user } = useContext(AuthContext);

  const handleCommitReview = async ({ name, email, review, rating }) => {
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        name,
        email,
        review,
        rating,
        user_id: user.id,
        product_id: product.id,
      })
      .select(
        `
      *,
      profiles (
        first_name,
        last_name,
        avatar
      )
    `,
      )
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    setReviews((prev) => [...prev, data]);

    toast.success("Review Submitted");
  };

  return (
    <div className="main-add-review-container">
      <h2>Add your Review</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          review: "",
          rating: 0,
        }}
        validationSchema={reviewValidation}
        onSubmit={(values) => {
          handleCommitReview(values);
        }}
      >
        {({ setFieldValue, errors }) => {
          return (
            <Form className="review-detail">
              <div className="rating-container">
                <h4>Your Rating</h4>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star, i) => {
                    return (
                      <img
                        key={i}
                        onClick={() => {
                          setFieldValue("rating", star);
                          setRatingStar(star);
                        }}
                        src={`main-images/stars/${star * 10}-${ratingStar === star ? "fill" : "stroke"}.svg`}
                        height={24}
                        alt="star-stroke"
                      />
                    );
                  })}
                </div>
                <p style={{ color: "red" }}>{errors.rating && errors.rating}</p>
              </div>
              <p style={{ color: "red" }}>{errors.avatar && errors.avatar}</p>
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter Your Name"
              />
              <ErrorMessage
                name="name"
                render={(res) => <p style={{ color: "red" }}>{res}</p>}
              />
              <label htmlFor="email">Email</label>
              <Field
                type="text"
                id="email"
                name="email"
                placeholder="Enter Your Email"
              />
              <ErrorMessage
                name="email"
                render={(res) => <p style={{ color: "red" }}>{res}</p>}
              />
              <label htmlFor="review">Your Review</label>
              <Field
                as="textarea"
                type="text"
                id="review"
                name="review"
                placeholder="Enter Your Review"
              />
              <div className="submit-review">
                <input
                  id="submit-review"
                  type="submit"
                  className="btn-submit-review"
                  value="Submit"
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
