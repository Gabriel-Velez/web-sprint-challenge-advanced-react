import React, { useState } from "react";
import moveGrid from "../hooks/moveGrid.js";
import axios from "axios";

export default function AppFunctional(props) {
  const [xCoord, setXCoord] = useState(2);
  const [yCoord, setYCoord] = useState(2);
  const [total, setTotal] = useState(0);

  const updateUI = (func, gridWidth, gridHeight, direction) => {
    const res = func(gridWidth, gridHeight, direction);

    //sets error message if out of bounds
    if (typeof res === "string") {
      document.querySelector("#message").innerHTML = res;
    }
    //Reset button
    else if (res.reset) {
      setXCoord(res.plotX);
      setYCoord(res.plotY);
      setTotal(0);
      setFormValues("");
      document.querySelector("#email").value = "";
      document.querySelector("#message").innerHTML = "";
    }
    //Move
    else {
      setXCoord(res.plotX);
      setYCoord(res.plotY);
      setTotal(total + 1);
      document.querySelector("#message").innerHTML = "";
    }
  };

  const [formValues, setFormValues] = useState("");

  const onChange = (evt) => {
    setFormValues(evt.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const submission = {
      x: xCoord,
      y: yCoord,
      steps: total,
      email: formValues,
    };
    setFormValues("");
    document.querySelector("#email").value = "";
    axios
      .post("http://localhost:9000/api/result", submission)
      .then((res) => {
        document.querySelector("#message").innerHTML = res.data.message;
      })
      .catch((err) => {
        // console.error(err);
        document.querySelector("#message").innerHTML = err.response.data.message;
        // console.log(err.response.data.message);
      });
  };

  return (
    <div id='wrapper' className={props.className}>
      <div className='info'>
        <h3 id='coordinates'>
          Coordinates ({xCoord}, {yCoord})
        </h3>
        <h3 id='steps'>
          You moved {total} {total === 1 ? "time" : "times"}
        </h3>
      </div>
      <div id='grid'>
        <div className='square'></div>
        <div className='square'></div>
        <div className='square'></div>
        <div className='square'></div>
        <div className='square active'>B</div>
        <div className='square'></div>
        <div className='square'></div>
        <div className='square'></div>
        <div className='square'></div>
      </div>
      <div className='info'>
        <h3 id='message'></h3>
      </div>
      <div id='keypad'>
        <button id='left' onClick={() => updateUI(moveGrid, 3, 3, "left")}>
          LEFT
        </button>
        <button id='up' onClick={() => updateUI(moveGrid, 3, 3, "up")}>
          UP
        </button>
        <button id='right' onClick={() => updateUI(moveGrid, 3, 3, "right")}>
          RIGHT
        </button>
        <button id='down' onClick={() => updateUI(moveGrid, 3, 3, "down")}>
          DOWN
        </button>
        <button id='reset' onClick={() => updateUI(moveGrid, 3, 3, "reset")}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input id='email' type='email' placeholder='type email' onChange={onChange}></input>
        <input id='submit' type='submit'></input>
      </form>
    </div>
  );
}
