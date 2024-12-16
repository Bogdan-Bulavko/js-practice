function census(arr) {
  if (arr.length <= 1) return undefined;

  const pers = arr.reduce((acc, item) => {
    if (item.gender === 'Male') {
      return item.age > acc.age ? item : acc;
    } else {
      return acc;
    }
  });

  return pers.name;
}

console.log(
  census([
    { age: 12, name: 'Bob', gender: 'Male' },
    { age: 37, name: 'Liza', gender: 'Female' },
    { age: 80, name: 'Gera', gender: 'Female' },
    { age: 70, name: 'Goo', gender: 'Male' },
    { age: 40, name: 'Foo', gender: 'Male' },
  ])
); // 'Goo'
console.log(census([{ age: 40, name: 'Liza', gender: 'Female' }])); // 'undefined'
