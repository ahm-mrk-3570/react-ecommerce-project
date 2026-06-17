import { Link, useNavigate } from "react-router-dom";
import ChangeThemeBoxHandling from "../../components/ChangeThemeBoxHandling";
import InputBox from "../../components/InputBox";
import { loginSchema } from "../../validation/authValidation";
import "./Login.css";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { supabase } from "../../lib/supabase";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Login Successfully..");
      navigate('/')
      return data;
    } catch (err) {
      console.log(err.message);
      toast.error(err.message || "Something went wrong..");
    }
  };

  return (
    <>
      <title>Login</title>
      <div className="login-body">
        <div className="left-side-login"></div>
        <div className="right-side-login">
          <div className="fields-container-login">
            <div className="top-field-container-login">
              <h1 className="top-filed-title-login">Welcome 👋</h1>
              <h3 className="top-field-description-login">Please login here</h3>
            </div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginSchema}
              onSubmit={(values) => {
                handleLogin(values);
              }}
            >
              <Form className="middle-field-container">
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
                <input
                  className="btn-login"
                  value="Login"
                  type="submit"
                  id="btn-login"
                />
                <span style={{ marginTop: "15px" }}>
                  Already have an account?
                  <Link
                    style={{ paddingLeft: "5px", fontSize: "1.2rem" }}
                    to="/register"
                  >
                    Sign Up
                  </Link>
                </span>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
