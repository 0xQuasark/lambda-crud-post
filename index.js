'use strict'

const dynamoose = require('dynamoose');
 
// define our schema
const peopleSchema = new dynamoose.Schema({
  'id': Number,
  'name': String,
  'email': String,
});
let results = null;
// create our Model
let personModel = dynamoose.model('cf-lambda-crud', peopleSchema); // first argument is the name of the table

exports.handler = async (event) => {
  console.log('crudPOST 1.0');
  console.log('HERE IS THE EVENT OBJECT', event)
  // console.log('Here are the path parameters: ', event.pathParameters)

  let postData = JSON.parse(event.body); // Assuming the incoming request body is a JSON string

  let newPerson = new personModel({
    id: postData.id,
    name: postData.name,
    email: postData.email
  });

  try {
    results = await newPerson.save();
  } catch (error) {
    console.log('ERROR: ', error)
    return {
      statusCode: 400,
      body: JSON.stringify('Could not save person'),
    };
  }

  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify(results),
  };
  return response;
};
