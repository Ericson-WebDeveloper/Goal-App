import React from "react";
import { removeGoal } from "../store/redux/goalsSlice";
import { useDispatch } from "react-redux";

export const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();

  const onHandleDelete = () => {
    dispatch(removeGoal(goal._id));
  };

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      <button type="button" className="btn" onClick={onHandleDelete}>
        Delete
      </button>
    </div>
  );
};
