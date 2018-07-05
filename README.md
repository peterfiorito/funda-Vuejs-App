Funda - Vuejs App
======================

Vuejs App to display funda api data.

## Run instructions

The project has two folders, server and client. To have the project fully functional, run `npm install` on each.
Then run `npm start` on server and `npm run dev` on client.
The client hosts the front end vuejs app, and its served in localhost:8080 , while the server will run on localhost:8081.
The server makes the api request to funda api, and stores it. Then the front end makes request to our local server when data is needed.
The main reason for this is that funda api offer no CORS support nor it accepts JSONP requests, so making api requests from the client/browser won't work.