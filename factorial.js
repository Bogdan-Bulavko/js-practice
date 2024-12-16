function factorial(num) {
  if (num <= 1) {
    return num;
  } else {
    return num * factorial(num - 1); //
  }
}

console.log(factorial(4)); // 24
console.log(factorial(5)); // 120
console.log(factorial(10)); // 3628800
