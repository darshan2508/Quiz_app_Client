import React, { useEffect, useState } from "react";
import Questions from "./Questions";

import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";

/** redux store imports */
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Quiz() {
  const [check, setChecked] = useState(undefined);

  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  function onPrev() {
    //console.log("on prev click");
    if (trace > 0) {
      /**update the trace value by one using move prev action */
      dispatch(MovePrevQuestion());
    } else {
      alert("You are already at the start of quiz.");
    }
  }

  function onNext() {
    //console.log("on next click");
    if (trace < queue.length) {
      /**update the trace value by one using move next action */
      dispatch(MoveNextQuestion());

      /**insert a new result in the array.  */
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }

    /** reset the value of the checked variable  */
    setChecked(undefined);
  }

  function onChecked(check) {
    console.log(check);
    setChecked(check);
  }

  /** finished exam after the last question */
  if (result.length && result.length >= queue.length) {
    return <Navigate to={"/result"} replace={true}></Navigate>;
  }

  return (
    <div className="container" style={{ marginTop: 0 }}>
      <h1 className="title text-light">Quiz Application</h1>

      {/* Questions */}
      <Questions onChecked={onChecked} />
      <div className="grid">
        {trace > 0 ? (
          <button className="btn prev" onClick={onPrev}>
            PREV
          </button>
        ) : (
          <div></div>
        )}
        <button className="btn next" onClick={onNext}>
          NEXT
        </button>
      </div>
    </div>
  );
}
