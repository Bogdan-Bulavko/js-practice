function checkTicket(str) {
  const arr = str.split('').map((item) => +item);
  let numTotal = arr.reduce((acc, item) => acc + item); // Общее число
  let num2 = 0; // Число второй половинки
  for (let i = arr.length - 1; i >= 0; i--) {
    // Перебираю массив с конца
    numTotal -= arr[i]; // От общего числа отнимаю крайнее число
    num2 += arr[i]; // К числу второй половинки прибавляю крайнее число
    if (numTotal === num2) {
      return true;
    }
  }
  /*С каждой итерацией общее число уменьшаеться, а число второй половинки увеличивается. 
  Либо они будут равны, либо нет и не имеет значения четная длина массива или нет*/
  return false;
}

console.log(checkTicket('005212')); // true
console.log(checkTicket('133700')); // true
console.log(checkTicket('123032')); // false
console.log(checkTicket('0052102')); // true
