# React notes app

Web app for saving and shearing password protected notes.
Client built with React, backend build with AWS Lambda, Dynamodb and APIGateway.

`./Lambda` folder contains three lambda functions:

`notes_post` saves the notes to DB

`notes_get.py` fetches the notes from DB to client

`timestamp_post` changes the availability perioid for the notes


`./src` folder contains all the React code.
