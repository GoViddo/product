# GoViddo Product
It has 3 different layers as below,

## 1. Application layer

Please follow below steps to run the sample node server,

  a. Go to AppLayer folder
  
  b. Run 'npm install' command
  
  c. Run 'node app.js' to start the server
  
  d. To test GET API, open any browser and hit 'http://localhost:3000/listUsers'. This will display a dummy JSON object on your browser.
  
  e. To test POST API, open any utility like Postman or Swagger. Select API method as POST. Use URL as 'http://localhost:3000/addUser'. Select body parameters as raw data (Application/JSON) and add body such as {"name":"mohit123","password":"password4","profession":"teacher","id":4}
  
  It appears that, the new data got added to the existing list and it returns a new list with fresh data. This can be verified with the response.

## 2. Database layer
## 3. Blockchain layer
