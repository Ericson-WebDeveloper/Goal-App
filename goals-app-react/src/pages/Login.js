import React, { useState, useEffect } from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";
import { reset, signin } from "../store/redux/userSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, SetFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const { isLoading: isLoading2 } = useSelector((state) => state.goal);
  const { user, isLoading, isError, isSucces, errors } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      toast.error(errors);
    }

    if (isSucces || user != null) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isLoading, isError, isSucces, errors, dispatch, navigate]);

  const onHandleForm = (e) => {
    SetFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onLogin = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(signin(userData));
  };

  if (isLoading || isLoading2) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
      </section>
      <section className="form">
        <form onSubmit={(e) => onLogin(e)}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => onHandleForm(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => onHandleForm(e)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
