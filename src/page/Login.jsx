import React, { useContext, useState } from "react";
import Input from "../components/shared/input";
import eyeOpen from "../assets/icons/eye-open.svg";
import Checkbox from "../components/shared/checkbox";
import Button from "../components/shared/button";
import signinimage from "../assets/images/sign-in-image.svg";
import logoicon from "../assets/images/_Tinted Icon.svg";
import googleicon from "../assets/images/_Google Logo Icon.svg";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email or Username is required.";
    } else if (
      !emailRegex.test(formData.email) &&
      formData.email.includes("@")
    ) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const { success, message } = await login(
        formData.email,
        formData.password
      );

      if (!success) {
        setErrors({ api: message });
        notification.error({
          message: "Login Failed",
          description: message || "An error occurred during login.",
        });
      } else {
        setErrors({});
        notification.success({
          message: "Logged In Successfully",
          description: "You have logged in successfully.",
        });
        navigate("/home-page");
      }
    } catch (error) {
      setErrors({ api: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex h-screen">
      <div className="w-full lg:w-[40%]">
        <div className="custom-container mx-6 lg:mx-16 my-8 flex flex-col">
          <img src={logoicon} alt="logo" className="w-[170px] h-11" />

          <div className="flex flex-col gap-3 mt-[32px]">
            <h1 className="font-semibold text-2xl lg:text-5xl custom-text">
              Welcome <br /> Back
            </h1>
            <p className="text-sm lg:text-base font-light text-gray-600">
              You need to be signed in to access the project
              <br /> dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <div>
              <Input
                type="email"
                placeholder="Email or User Name"
                label="Email or User Name"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Enter your password"
                label="Password"
                name="password"
                icon={eyeOpen}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Checkbox
              label="Remember me!"
              labelClass="medium"
              id="remember"
              value={formData.remember}
              onChange={handleChange}
            />
            <p className="font-medium underline">Forgot Password?</p>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
            <Button
              className="btn-primary w-full h-12"
              text={loading ? "Please Wait" : "Sign In"}
              onClick={handleSignIn}
            />
            <Button
              className="btn-secondary w-full h-12 gap-3"
              text="Sign In with Google"
              img={googleicon}
            />
          </div>

          <div className="mt-4 lg:mt-8 flex items-center justify-center">
            <p className="font-light  text-gray-500">
              Haven’t joined yet?{" "}
              <span className="font-medium ml-1 underline text-gray-900">
                Sign Up{" "}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1">
        <img
          src={signinimage}
          alt="background-image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
