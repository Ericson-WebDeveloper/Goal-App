import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getGoals, reset } from "../store/redux/goalsSlice";
import { GoalForm } from "../components/GoalForm";
import { GoalItem } from "../components/GoalItem";
import { Spinner } from "../components/Spinner";

export const DashBoard = () => {
  const { goals, isLoading, isError, isSucces, message, errors } = useSelector(
    (state) => state.goal
  );
  const { user, isLoading: isLoading2 } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = () => {
      dispatch(getGoals());
    };

    if (isError) {
      console.log(errors);
    }
    if (!user) {
      navigate("/signin");
    }

    if (user) {
      fetchGoals();
    }

    dispatch(reset());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, errors, isError]);

  // useEffect(() => {

  // }, [dispatch]);

  if (isLoading || isLoading2) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Board</p>
      </section>
      <section className="form">
        <GoalForm />
      </section>

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal, index) => (
              <GoalItem key={index} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>No Data</h3>
        )}
      </section>
    </>
  );
};
