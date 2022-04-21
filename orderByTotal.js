// Develop a program which produces ordered array of sales.
// Input: array of objects with the following structure {amount: 10000, quantity: 10}.
// Output: new array of ordered sales.
// Array element structure should be: {amount: 10000, quantity: 10, Total: 100000},
// where Total = amount * quantity.
// Please order by Total and note that input array shall remain intact.

const inputArray = [
  { amount: 10000, quantity: 10 },
  { amount: 50000, quantity: 50 },
  { amount: 1000, quantity: 20 },
  { amount: 10, quantity: 40 },
  { quantity: 40 }, //for testing purposes - expected Total: O due to not existing amount property
  { amount: 10, quantity: "40" }, // for testing purposes - expected Total: 400
  { amount: 10, quantity: "40f" }, //for testing purposes - expected Total: O due to non numeric value after parsing
  { amount: 10, quantity: "4 000" }, //for testing purposes - expected Total: O due to non numeric value after parsing
];

function orderByTotal(array, sortOrder = "ASC") {
  // default sorting in ascending order
  const outputArray = [];
  array.forEach((object) => {
    const amount = isNaN(Number(object.amount)) ? 0 : Number(object.amount);  
    const quantity = isNaN(Number(object.quantity)) ? 0 : Number(object.quantity);
    object.Total = amount * quantity;
    outputArray.push(object);
  });
  outputArray.sort((a, b) => {
    return sortOrder === "ASC" ? a.Total - b.Total : b.Total - a.Total;
  });
  return outputArray;
}

// TESTING
console.log("This is input array", inputArray); // to confirm that the input array remained intact
console.log("This is output array sorted by ASC", orderByTotal(inputArray));
console.log("This is output array sorted by DESC", orderByTotal(inputArray, "DESC")); 
