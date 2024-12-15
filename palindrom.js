function isPalindrome(str) {
  return str === str.reverse() ? true : false;
}

console.log(isPalindrome('121')); // true
console.log(isPalindrome('boob')); // true
console.log(isPalindrome('true')); // false
