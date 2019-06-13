'use strict'
let axios = require('axios');
let id_ = '';
let op = 0;

//Get the object with ID & properties to perform ops
axios({
  method: 'get',
  url: 'https://interview.adpeai.com/api/v1/get-task'
})
  .then( (res) => {
    console.log("");
    console.log(res.data);
    id_ = res.data.id;

    switch(res.data.operation){
      case 'addition':
        op = res.data.left + res.data.right;
        break;
      case 'subtraction':
        op = res.data.left - res.data.right;
        break;
      case 'multiplication':
        op = res.data.left * res.data.right;
        break
      case 'division':
        op = res.data.left / res.data.right;
        break;
      case 'remainder':
        op = res.data.left % res.data.right;
        break;
      default:
    }

    console.log("");
    console.log(`${res.data.operation}: `, op);

    //Post result with ID to endpoint
    axios({
      method: 'post',
      url: 'https://interview.adpeai.com/api/v1/submit-task',
      data: {
        id: id_,
        result: op
      }
    }).then(res => {      //CASE SUCCESS
        console.log("");
        console.log("status: ", res.status);
        console.log("response: ", res.data);
      }).catch(err => {   //CASE FAILURE
        console.log("");
        console.log("--ERROR ON SUBMIT--");
        console.log("status: ", err.response.status);
        console.log("data: ", err.response.data);
      });
  });
