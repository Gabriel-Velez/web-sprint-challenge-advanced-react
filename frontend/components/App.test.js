// Write your tests here
test("sanity", () => {
  expect(true).toBe(true);
  render(<App />);
  const header = screen.getByText("Welcome to the GRID");
  const coordinates = screen.getByLabelText(/coordinates/i);
  const steps = screen.getByLabelText(/you moved/i);
  const up = screen.getByLabelText(/up/i);
  const down = screen.getByLabelText(/down/i);
  const left = screen.getByLabelText(/left/i);
  const right = screen.getByLabelText(/right/i);
  const reset = screen.getByLabelText(/reset/i);

  expect(header).toBeInTheDocument();
  expect(coordinates).toBeInTheDocument();
  expect(steps).toBeInTheDocument();
  expect(up).toBeInTheDocument();
  expect(down).toBeInTheDocument();
  expect(left).toBeInTheDocument();
  expect(right).toBeInTheDocument();
  expect(reset).toBeInTheDocument();
});
