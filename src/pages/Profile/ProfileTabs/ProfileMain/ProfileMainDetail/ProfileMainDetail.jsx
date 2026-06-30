import { useContext, useState } from "react";
import FormInputBox from "../../../../../components/FormInputBox/FormInputBox";
import "./ProfileMainDetail.css";
import AuthContext from "../../../../../context/AuthContext";
import { updateProfileValidationSchema } from "../../../../../validation/updateProfileValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { supabase } from "../../../../../lib/supabase";
import { toast } from "react-toastify";
import {
  updateEmail,
  updateProfile,
} from "../../../../../services/profileServices";

export default function ProfileMainDetail() {
  const [isEdited, setIsEdited] = useState(true);

  const { profile, user: userData } = useContext(AuthContext);

  const handleChangeData = async (values) => {
    try {
      const { error: profileError } = await updateProfile(values, userData);

      if (profileError) return;

      if (values.email !== userData.email) {
        const { error: emailError } = await updateEmail(values);

        if (emailError) return;
      }

      await supabase.auth.refreshSession();

      toast.success("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="profile-main-detail">
      <div className="profile-main-image">
        {profile?.avatar !== "" ? (
          <img src={profile?.avatar} height={80} alt="profile pic" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            fill="currentColor"
            className="bi bi-person"
            viewBox="0 0 16 16"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
          </svg>
        )}
        <button
          onClick={() => setIsEdited(!isEdited)}
          className="edit-profile-details"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
            />
          </svg>
          Edit Profile
        </button>
      </div>
      <div className="profile-main-info">
        <Formik
          enableReinitialize
          initialValues={{
            first_name: profile?.first_name,
            last_name: profile?.last_name,
            phone_number: profile?.phone_number,
            email: userData?.email,
          }}
          validationSchema={updateProfileValidationSchema}
          onSubmit={(values) => {
            handleChangeData(values);
          }}
        >
          <Form className="full-names-boxes">
            <div className="fields-container">
              <div className="box-container">
                <label htmlFor="first_name">First Name:</label>
                <Field
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="Enter your first name"
                  disabled={isEdited}
                />
                <ErrorMessage
                  name="first_name"
                  render={(res) => <div style={{ color: "red" }}>{res}</div>}
                />
              </div>
              <div className="box-container">
                <label htmlFor="last_name">Last Name:</label>
                <Field
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Enter your last name"
                  disabled={isEdited}
                />
                <ErrorMessage
                  name="last_name"
                  render={(res) => <div style={{ color: "red" }}>{res}</div>}
                />
              </div>
              <div className="box-container">
                <label htmlFor="phone_number">Phone Number:</label>
                <Field
                  type="text"
                  name="phone_number"
                  id="phone_number"
                  placeholder="Enter your Phone Number with prefix"
                  disabled={isEdited}
                />
                <ErrorMessage
                  name="phone_number"
                  render={(res) => <div style={{ color: "red" }}>{res}</div>}
                />
              </div>
              <div className="box-container">
                <label htmlFor="email">Email:</label>
                <Field
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  disabled={isEdited}
                />
                <ErrorMessage
                  name="email"
                  render={(res) => <div style={{ color: "red" }}>{res}</div>}
                />
              </div>
            </div>

            <input
              disabled={isEdited}
              type="submit"
              className="btn-change"
              value="Update Data"
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
}
