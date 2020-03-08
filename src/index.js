fetch('mydata.json')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(`Hello ${data.name}`);
  });
