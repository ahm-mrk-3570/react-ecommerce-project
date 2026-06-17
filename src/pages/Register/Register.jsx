import "./Register.css";
import InputBox from "../../components/InputBox";
import CheckBoxComponent from "../../components/RegisterComponents/CheckBoxComponent";
import ChangeThemeBoxHandling from "../../components/ChangeThemeBoxHandling";
import { registerSchema } from "../../validation/authValidation";
import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { supabase } from "../../lib/supabase";

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async ({
    firstName,
    lastName,
    avatar,
    email,
    password,
    phoneNumber
  }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName, last_name: lastName, phone_number: phoneNumber },
        },
      });

      if (error) throw error;
      if (!data.user) throw new Error("Registration failed.");

      // ✅ Only attempt avatar upload if user has an active session
      if (avatar && data.session) {
        const filePath = `avatars/${data.user.id}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatar, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        const { error: updateError } = await supabase
          .from("profiles")
          .update({ avatar: publicUrlData.publicUrl })
          .eq("id", data.user.id);

        if (updateError) throw updateError;
      } else if (avatar && !data.session) {
        console.log("Avatar skipped — email confirmation required first");
      }

      toast.success("Account created!");
      navigate("/login", { replace: true });
      return data;
    } catch (err) {
      console.log(err.message);
      toast.error(err.message || "Something went wrong..");
    }
  };

  return (
    <>
      <title>Register</title>
      <div className="register-body">
        <div className="left-side"></div>
        <div className="right-side">
          <div className="fields-container">
            <div className="top-field-container">
              <h1 className="top-filed-title">Create New Account</h1>
              <h3 className="top-field-description">Please enter details</h3>
            </div>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                password: "",
                avatar: null,
                rules: false,
              }}
              validationSchema={registerSchema}
              onSubmit={(values) => {
                handleRegister(values);
              }}
            >
              {({ touched, errors, setFieldValue }) => (
                <Form className="middle-field-container">
                  <label htmlFor="firstName">First Name:</label>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="firstName"
                    render={(res) => <div style={{ color: "red" }}>{res}</div>}
                  />
                  <label htmlFor="lastName">Last Name:</label>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter your last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    render={(res) => <div style={{ color: "red" }}>{res}</div>}
                  />
                  <label htmlFor="phoneNumber">Phone Number:</label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Enter your Phone Number with prefix"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    render={(res) => <div style={{ color: "red" }}>{res}</div>}
                  />
                  <label htmlFor="email">Email:</label>
                  <Field
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter your Email"
                  />
                  <ErrorMessage
                    name="email"
                    render={(res) => <div style={{ color: "red" }}>{res}</div>}
                  />
                  <label htmlFor="password">Password:</label>
                  <Field
                    type="text"
                    name="password"
                    id="password"
                    placeholder="Enter your Password"
                  />
                  <ErrorMessage
                    name="password"
                    render={(res) => <div style={{ color: "red" }}>{res}</div>}
                  />
                  <label htmlFor="">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setFieldValue("avatar", e.currentTarget.files[0]);
                    }}
                  />
                  <div>
                    <Field
                      className={
                        touched.rules && errors.rules ? "error-check" : ""
                      }
                      type="checkbox"
                      name="rules"
                      id="rules"
                    />
                    <label style={{ marginLeft: "0.2rem" }} htmlFor="rules">
                      I accept to the <b>Terms & Conditions</b>
                    </label>
                  </div>
                  <input
                    className="btn-signup"
                    value="Signup"
                    type="submit"
                    id="btn-register"
                  />
                  <span style={{ marginTop: "15px" }}>
                    Already have an account?
                    <Link
                      style={{ paddingLeft: "5px", fontSize: "1.2rem" }}
                      to="/login"
                    >
                      Sign In
                    </Link>
                  </span>
                </Form>
              )}
            </Formik>
            <ChangeThemeBoxHandling />
          </div>
        </div>
      </div>
    </>
  );
}
