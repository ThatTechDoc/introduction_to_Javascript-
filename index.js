// Question 1: Defining a function that takes two numbers and an operator, then performs the corresponding operation
 function add (num1, num2, operator) {
    if (operator == '+') {
        return num1 + num2; }
    else if (operator == '-') {
        return num1 - num2; }
    else if (operator == '*') {
        return num1 * num2; }
    else if (operator == '/') {
        if (num2 == 0) {
            return "Division by zero is undefined";}
        return num1 / num2; }
    else if (operator == '**') {
        return num1 ** num2; } //or return Math.pow(num1, num2)
    else if (operator == '%') {
        return num1 % num2; }
    else {
        return "Invalid operator";}
 }

// Testing the function with some examples
const returnedValue = [
    {num1: 10, num2: 5, operator: '+'},  // Addition
    {num1: 10, num2: 5, operator: '-'},  // Subtraction
    {num1: 10, num2: 5, operator: '*'},  // Multiplication
    {num1: 10, num2: 5, operator: '/'},  // Division
    {num1: 10, num2: 0, operator: '/'},  // Division by zero
    {num1: 2, num2: 3, operator: '**'},  // Exponentiation
    {num1: 10, num2: 3, operator: '%'},   // Modulus
]

// Creating the result object
const results = {};
returnedValue.forEach(({num1, num2, operator}) => { results[`${num1} ${operator} ${num2}`] = add(num1, num2, operator);
});

console.log(results);

// Question 2: Function to take an array of numbers and operators and perform the operations in chronological order
function performOperations(arr) {
    // Check if the input array has an odd number of elements: number, operator, number, etc.
    if (arr.length % 2 === 0) {
        return "Invalid input: array must have an odd number of elements (numbers and operators)";
    }
    // Start with the first number in the array
    let result = arr[0];

    // Loop through the array, performing operations in order or assuming they alternate.
    for (let number = 1; number < arr.length; number += 2) {
        let operator = arr[number];
        let nextNumber = arr[number + 1];

        if (operator === '+') {
            result += nextNumber;
        } else if (operator === '-') {
            result -= nextNumber;
        } else if (operator === '*') {
            result *= nextNumber;
        } else if (operator === '/') {
            if (nextNumber === 0) {
                return "Error: Division by zero is undefined";
            }
            result /= nextNumber;
        } else if (operator === '**') {
            result **= nextNumber;
        } else if (operator === '%') {
            result %= nextNumber;
        } else {
            return "Invalid operator: " + operator;
        }
    }

    return result.toFixed(2);
}

// Example usage:
const inputArray = [10, '+', 5, '*', 2, '-', 3, '/', 2]; // Expected result: (10 + 5) * 2 - 3 / 2 = 13.50
console.log(performOperations(inputArray));

// Question 3: to ensure that multiplication, division, and exponentiation are performed before addition and subtraction, regardless of their position in the array.
function calculateBODMAS(arr) {
    // Helper function to handle multiplication, division, and exponentiation first
    const handlePrecedence = (array) => {
      let newArray = [];
      let number = 0;
      while (number < array.length) {
        const currentElement = array[number];
        if (currentElement === '*' || currentElement === '/' || currentElement === '**' || currentElement === '%') {
          const prevNumber = newArray.pop();
          const nextNumber = array[number + 1];
  
          if (currentElement === '*') {
            newArray.push(prevNumber * nextNumber);
          } else if (currentElement === '/') {
            if (nextNumber === 0) return "Division by zero is undefined";
            newArray.push(prevNumber / nextNumber);
          } else if (currentElement === '**') {
            newArray.push(Math.pow(prevNumber, nextNumber));
          } else if (currentElement === '%') {
            newArray.push(prevNumber % nextNumber);
          }
          number += 2; // Skip the next number since it was already processed
        } else {
          newArray.push(currentElement);
          number++;
        }
      }
      return newArray;
    };
  
    // Step 1: Handle multiplication, division, exponentiation, and modulus first
    const afterPrecedence = handlePrecedence(arr);
  
    // Step 2: Now handle addition and subtraction in order
    let result = afterPrecedence[0];
    for (let number = 1; number < afterPrecedence.length; number += 2) {
      const operator = afterPrecedence[number];
      const nextNumber = afterPrecedence[number + 1];
  
      if (operator === '+') {
        result += nextNumber;
      } else if (operator === '-') {
        result -= nextNumber;
      }
    }
  
    return result.toFixed(2); // Round the result to 2 decimal places
  }
  
  // Example usage:
  console.log(calculateBODMAS([10, '+', 5, '*', 2, '-', 3, '/', 2])); // Expected output: "18.50"
  