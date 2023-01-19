import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGoals, reset } from "../store/redux/goalsSlice";
import { toast } from "react-toastify";
export const GoalForm = () => {
  const [formdata, setFormData] = useState({
    text: "",
  });
  const dispatch = useDispatch();
  const { isError, errors, isSucces, message } = useSelector((state) => state.goal);
  const { text } = formdata;

  useEffect(() => {
    if (isError) {
      toast.error(errors);
    }

    if (isSucces) {
      toast.success(message);
    }

    dispatch(reset());

    return () => {
      dispatch(reset());
    };
  }, [errors, isError, isSucces, dispatch, message]);

  const onHandleData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      text: e.target.value,
    }));
  };

  const onHandleAddGoals = (e) => {
    e.preventDefault();
    const data = {
      text: formdata.text,
    };
    dispatch(addGoals(data));
  };

  return (
    <>
      <form onSubmit={onHandleAddGoals}>
        <div className="form-group">
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Goal Text"
            value={text}
            onChange={onHandleData}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
