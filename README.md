
# API Documentation

Welcome to the API documentation. This comprehensive guide will help you understand and interact with the various functionalities of our server. Whether you are a developer looking to integrate with our API or a team member seeking insights into the server architecture, this documentation provides all the necessary information to get you started.


## Introduction

This api is a cutting-edge server application that offers a seamless integration of RESTful endpoints and WebSocket API to enable real-time communication between clients and the server. Our server is built using the popular Express framework for handling HTTP requests and Socket.IO for WebSocket support.
## Purpose

The primary goal of this api is to provide a reliable and scalable solution for handling user interactions, data exchange, and real-time events in a secure manner. It serves as the backend for a range of applications, including real-time collaborative tools, chat applications, gaming platforms, and more.
## Features

RESTful Endpoints: Our server exposes a set of RESTful endpoints to handle various client requests, including user registration, authentication, data retrieval, and more. These endpoints follow standard HTTP methods and offer JSON-based communication.

WebSocket API: To enable real-time bidirectional communication, we have implemented a robust WebSocket API. Clients can establish WebSocket connections with the server and subscribe to specific events, allowing seamless data exchange and instant updates.

Security: Security is paramount in our application. We have implemented token-based authentication using JSON Web Tokens (JWT) to ensure that only authorized users can access certain endpoints and WebSocket events.

Error Handling: Our server incorporates a comprehensive error handling mechanism to provide meaningful error responses in case of invalid requests or server-side issues.
## How to start this application

clone this application in your machine.

### FrontEnd

Navigate to the client folder in your terminal using the cd command:

cd client

Install all dependecies using following command --->  npm install

Go to the src folder, then navigate to the api.js file and then change host variable to the url of backend api.

Run the application using following command

npm run dev


### BackEnd

Navigate to the client folder in your terminal using the cd command:

cd server

install all dependecies using following command --->  npm install

Create .env file which should have two variables 

JWT_SECRET = "which defines your jwt secret key"

ALLOWED_ORIGIN = "paste here url of your frontend application"

And then run the follwing command ---> npm start
