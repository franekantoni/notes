# React notes app

Web app for saving and shearing password protected notes.
Client built with React, backend build with AWS Lambda, DynamoDB and APIGateway.

`./Lambda` folder contains three lambda functions:

`notes_post` saves the notes to the DB

`notes_get.py` fetches the notes from the DB

`timestamp_post` changes the availability perioid of notes


`./src` folder contains all the React code.

*Interface optimized for desktop users.
