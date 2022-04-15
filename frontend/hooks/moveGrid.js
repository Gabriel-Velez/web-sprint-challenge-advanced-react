const moveGrid = (gridWidth, gridHeight, direction) => {
  //finds all square elements in the grid
  const squares = document.querySelectorAll("#grid .square");

  //initlializes x and y variables
  let countX = 0;
  let countY = 1;

  //makes an array of objects with the element, x coordnate, y cordnate, and active element
  const squareObjects = [...squares].map((square) => {
    countX === gridWidth ? (countY++, (countX = 1)) : countX++;
    return {
      square: square,
      plotX: countX,
      plotY: countY,
      active: square.classList.contains("active") ? true : false,
      reset: false,
    };
  });

  //gets the index of the element with active
  const isActive = squareObjects.findIndex((element) => element.active === true);

  //initializes variable for switch
  let newActive;
  let reset = false;
  //switch case for each direction
  switch (direction) {
    case "up":
      if (squareObjects[isActive].plotY === 1) return "You can't go up";
      newActive = squareObjects.findIndex(
        (element) =>
          element.plotX === squareObjects[isActive].plotX &&
          element.plotY === squareObjects[isActive].plotY - 1
      );
      break;

    case "down":
      if (squareObjects[isActive].plotY === gridHeight) return "You can't go down";
      newActive = squareObjects.findIndex(
        (element) =>
          element.plotX === squareObjects[isActive].plotX &&
          element.plotY === squareObjects[isActive].plotY + 1
      );
      break;

    case "left":
      if (squareObjects[isActive].plotX === 1) return "You can't go left";
      newActive = squareObjects.findIndex(
        (element) =>
          element.plotX === squareObjects[isActive].plotX - 1 &&
          element.plotY === squareObjects[isActive].plotY
      );
      break;

    case "right":
      if (squareObjects[isActive].plotX === gridWidth) return "You can't go right";
      newActive = squareObjects.findIndex(
        (element) =>
          element.plotX === squareObjects[isActive].plotX + 1 &&
          element.plotY === squareObjects[isActive].plotY
      );
      break;

    case "reset":
      newActive = Math.round((squareObjects.length - 1) / 2);
      reset = true;
      break;
  }

  //logic for reset
  if (reset === true && Math.round((squareObjects.length - 1) / 2) === isActive) {
    const resetObj = squareObjects[newActive];
    resetObj.reset = "true";
    squares[isActive].classList.remove("active");
    squares[newActive].innerHTML = squares[isActive].innerHTML;
    squares[newActive].classList.add("active");
    return resetObj;
  }

  if (reset === true) {
    const resetObj = squareObjects[newActive];
    resetObj.reset = "true";
    squares[isActive].classList.remove("active");
    squares[newActive].innerHTML = squares[isActive].innerHTML;
    squares[isActive].innerHTML = "";
    squares[newActive].classList.add("active");
    return resetObj;
  }

  //moves the square around according to switch data
  squares[isActive].classList.remove("active");
  squares[newActive].innerHTML = squares[isActive].innerHTML;
  squares[isActive].innerHTML = "";
  squares[newActive].classList.add("active");

  //returns object with square: square, plotX: countX, plotY: countY:, active: false, reset: false,
  return squareObjects[newActive];
};

export default moveGrid;
