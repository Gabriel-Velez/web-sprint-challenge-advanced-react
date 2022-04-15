import React from "react";
import moveGrid from "../hooks/moveGrid.js";
import axios from "axios";
export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { xCoord: 2, yCoord: 2, total: 0, formValues: "" };
  }

  render() {
    const updateUI = (func, gridWidth, gridHeight, direction) => {
      const res = func(gridWidth, gridHeight, direction);

      //sets error message if out of bounds
      if (typeof res === "string") {
        document.querySelector("#message").innerHTML = res;
      }
      //Reset button
      else if (res.reset) {
        this.setState({
          xCoord: res.plotX,
          yCoord: res.plotY,
          total: 0,
        });
        document.querySelector("#message").innerHTML = "";
      }
      //Move
      else {
        this.setState({
          xCoord: res.plotX,
          yCoord: res.plotY,
          total: this.state.total + 1,
          formValues: "",
        });
        document.querySelector("#message").innerHTML = "";
      }
    };
    const { className } = this.props;

    const onChange = (evt) => {
      const value = evt.target.value;
      this.setState({
        formValues: value,
      });
    };

    const onSubmit = (e) => {
      e.preventDefault();
      const submission = {
        x: this.state.xCoord,
        y: this.state.yCoord,
        steps: this.state.total,
        email: this.state.formValues,
      };
      this.setState({
        formValues: "",
      });
      document.querySelector("#email").value = "";
      axios
        .post("http://localhost:9000/api/result", submission)
        .then((res) => (document.querySelector("#message").innerHTML = res.data.message))
        .catch((err) => {
          console.error(err);
          document.querySelector("#message").innerHTML = "Ouch: email must be a valid email";
        });
    };

    return (
      <div id='wrapper' className={className}>
        <div className='info'>
          <h3 id='coordinates'>
            Coordinates ({this.state.xCoord}, {this.state.yCoord})
          </h3>
          <h3 id='steps'>You moved {this.state.total} times</h3>
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
}
