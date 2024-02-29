// return a number from 0 to number including 0 and number
export function randomNumber(number) {
  let randomNumber = Math.floor(Math.random() * (number + 1));
  return randomNumber;
}
