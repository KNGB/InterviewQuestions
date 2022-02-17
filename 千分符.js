function ThousandSeparator(number) {
  let newNum = "";
  for (let index = 0; index < number.split("").reverse().length; index++) {
    const element = number.split("").reverse()[index];
    newNum += element;
    if (
      (index + 1) % 3 === 0 &&
      index !== number.split("").reverse().length - 1
    ) {
      newNum += ",";
    }
  }
  return newNum.split("").reverse().join("");
}

console.log(ThousandSeparator("100000"));
