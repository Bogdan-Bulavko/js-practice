function checkTicket(str) {
  if (str.length % 2 !== 0) return false;
  const firstHalfTicket = str
    .split('')
    .slice(0, str.length / 2)
    .reduce((acc, item) => acc + +item, 0);

  const seccondHalfTicket = str
    .split('')
    .slice(str.length / 2)
    .reduce((acc, item) => acc + +item, 0);

  return firstHalfTicket === seccondHalfTicket ? true : false;
}
console.log(checkTicket('005212')); // true
console.log(checkTicket('133700')); // true
console.log(checkTicket('123032')); // false
