function isPalindrome(str) {
  return str.toLowerCase() === str.toLowerCase().split('').reverse().join('')
    ? true
    : false;
}

console.log(isPalindrome('121')); // true
console.log(isPalindrome('boob')); // true
console.log(isPalindrome('true')); // false
