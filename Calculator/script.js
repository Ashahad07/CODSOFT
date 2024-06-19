const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = "";
// add event listeners to each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Get the value from the buttons data attributes or its id
    const value =
      button.getAttribute("data-number") ||
      button.getAttribute("data-operator") ||
      button.id;
    // handle the button action based on its value
    switch (value) {
      case "clear":
        // clear all inputs and reset the display
        currentInput = "";
        previousInput = "";
        operator = "";
        updateDisplay("");
        break;
      case "delete":
        // delete the last character of current input
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
        break;
      case "equals":
        // If all necessary inputs are present, perform the calculation
        if (currentInput && previousInput && operator) {
          calculator();
        }
      case "+":
      case "-":
      case "*":
      case "/":
        // if there is a current input, handle the operator
        if (currentInput) {
          // if there is a pervious input as well, perfrom the calculation first
          if (currentInput && previousInput) {
            calculator();
          }
          // set the operator and move the current input to previous input 
          operator = value;
          previousInput = currentInput;
          currentInput = "";
        }
        break;
      default:
        // append the number to the current input if its lenght is less than 10 
        if (currentInput.length < 10) {
          currentInput += value;
          updateDisplay(currentInput);
        }
        break;
    }
  });
});
//  Function to update the display element with the current input or "0" if empty
function updateDisplay() {
  display.textContent = currentInput || "0";
}
// function to perform the calculation based on the operator
function calculator() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
// ireturn if either previous or current input is not a number
  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;

    default:
      return;
  }

  // update the current input with the result, reset operator and previous input, and update teh display
  currentInput = result.toString();
  operator = "";
  previousInput = "";
  updateDisplay(currentInput);
}
