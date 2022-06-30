let error = [];

const valiteFun = (data) => {
  console.log("Data", data);
  if (!data.name && data.name === "") {
    error = ["Please Enter valid name !"];
  }
  if (!data.password && data.password === "") {
    error = ["Please Enter valid password"];
  }
  console.log(error)
  return error;
};

module.exports = valiteFun;
