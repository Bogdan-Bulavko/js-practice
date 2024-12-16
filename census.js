function census(arr) {
  if (arr.length <= 1) return undefined;

  const pers = arr.reduce((acc, item) => {
    if (acc.age > item.age) {
      return acc;
    } else {
      return item;
    }
  });

  return pers.name;
}

console.log(
  census([
    { age: 12, name: 'Bob', gender: 'Male' },
    { age: 37, name: 'Liza', gender: 'Female' },
    { age: 80, name: 'Liza', gender: 'Female' },
    { age: 40, name: 'Foo', gender: 'Male' },
  ])
); // 'Foo'
console.log(census([{ age: 40, name: 'Liza', gender: 'Female' }])); // 'undefined'
