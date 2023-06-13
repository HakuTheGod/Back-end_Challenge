
## Node.js Express API with MongoDB

This is a Node.js application that serves as an API using the Express.js framework. It allows users to perform CRUD operations on user data stored in a MongoDB database. The application provides endpoints for user signup, login, retrieval of user details, updating user information, and deletion of user accounts.

## Installation

1. Clone the repository:
```git clone https://github.com/HakuTheGod/ Back-end_Challenge.git```

2. Install the dependencies:
``` cd project-directory ```\
``` npm Install ```

3. Set up the environment variables by creating a ```.env``` file and adding the required configuration values.


## Configuration

1. Create a MongoDB database and obtain the connection URI.

2. Update the ```.env``` file with the following configuration:
```MONGODB_URI=<your-mongodb-uri>```

3. Optionally, you can modify other configuration variables according to your requirements.

## Running the Application

To start the server, run the following command:\
```npm start```\
The server will start running on: ```http://localhost:4000```.
## API Documentation

The API endpoints and their usage are documented using the OpenAPI specification. \
You can find the API documentation in the ```definition.yaml``` file.
## Routes/Parameters

For testing the route parameters are explained below.

1. ```/sign_up``` 
get:\
parameters: none\
post:\
parameters: 
takes name,password,email and phone number as properties of a JSON object

2. ```/log_in``` 
get:\
parameters: none\
post:\
parameters: 
takes name and password as properties of a JSON object

3. ```/``` 
get:\
parameters: none\

4. ```/getUser``` 
get:\
parameters: takes id of a user as property of a JSON object

5. ```/postUser``` 
post:\
parameters: takes name,password,email and phone number as properties of a JSON object

6. ```/putUser``` 
put:\
parameters: takes id,name,password,email and phone number as properties of a JSON object

7. ```/deleteUser``` 
delete:\
parameters: takes id of a user as property of a JSON object

8. ```/400``` 
get:\
parameters: none\

9. ```/404``` 
get:\
parameters: none\

## Testing

To test the endpoints, you need to download [postman](https://www.postman.com) create an account and make the requests you want to test.

In case the route is protected you need to include a header on postman with ```Key: Authorisation``` and ```value: Bearer{{jwt}}```
## Authors

- [@NikolaKovatsevits](https://www.github.com/HakuTheGod)

