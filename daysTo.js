// 1.1.	Extend JS Date object with a method daysTo() which returns number of complete days
// between any pair of JS date objects: d1.daysTo(d2) should return quantity of complete days from d1 to d2.

const date1 = new Date("December 17, 1995 03:24:00");
const date2 = new Date("December 16, 1995 01:24:00");
const date3 = new Date("December 18, 1995 01:24:00");
const date4 = new Date("April 19, 2022");
const date5 = new Date(2022, 3, 19);

function daysTo(date) {
  const firstDate = this.getTime();
  const secondDate = date.getTime();
  const DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
  const difference =
    firstDate >= secondDate ? firstDate - secondDate : secondDate - firstDate;
  return Math.floor(difference / DAY_IN_MILLISECONDS);
}

Date.prototype.daysTo = daysTo;

// TESTING
console.log(date1.daysTo(date2)); // expected 1
console.log(date1.daysTo(date3)); // expected 0
console.log(date1.daysTo(date4)); // expected 9619
console.log(date1.daysTo(date5)); // expected 9619
