import React from "react";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppFunctional from "../components/AppFunctional";
// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
});

test("Renders without errors", () => {
  render(<AppFunctional />);
});

test("App render proper elements", () => {
  // Arrange: render component
  render(<AppFunctional />);

  //Act:
  const coordinates = screen.queryByText(/coordinates/i);
  const steps = screen.queryByText(/you moved/i);
  const up = screen.queryByText(/up/i);
  const down = screen.queryByText(/down/i);
  const left = screen.queryByText(/left/i);
  const right = screen.queryByText(/right/i);
  const reset = screen.queryByText(/reset/i);

  //Assert
  expect(coordinates).toBeInTheDocument();
  expect(steps).toBeInTheDocument();
  expect(up).toBeInTheDocument();
  expect(down).toBeInTheDocument();
  expect(left).toBeInTheDocument();
  expect(right).toBeInTheDocument();
  expect(reset).toBeInTheDocument();
});
