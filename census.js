// Это было сложно для меня, надо еще такие решить потерял час где-то

function census(arr) {
  if (arr.length <= 1) return undefined;

  const pers = arr.reduce((acc, item) => {
    if (item.gender === 'Male') {
      return acc.gender === 'Female' ? item : item.age > acc.age ? item : acc;
    } else {
      return acc;
    }
  });

  return pers.name;
}

console.log(
  census([
    { age: 20, name: 'Piza', gender: 'Female' },
    { age: 10, name: 'Joo', gender: 'Male' },
    { age: 20, name: 'Liza', gender: 'Female' },
    { age: 14, name: 'Foo', gender: 'Male' },
    { age: 20, name: 'Gera', gender: 'Female' },
    { age: 100, name: 'Griza', gender: 'Female' },
    { age: 15, name: 'Bob', gender: 'Male' },
    { age: 16, name: 'Goo', gender: 'Male' },
  ])
); // 'Goo'
console.log(census([{ age: 40, name: 'Liza', gender: 'Female' }])); // 'undefined'
