# multiplayer-spelling-bee
An implementation of the [New York Times Spelling Bee](https://www.nytimes.com/puzzles/spelling-bee) allowing for multiple players to cooperatively beat the puzzle.

The backend is hosted on Heroku and is built on Node. The frontend is hosted on Github Pages and built with React. The services interact via Socket IO, allowing for multidirectional communication without the frontend needing to poll for updates.

![Spelling Bee](https://i.imgur.com/R3mha9g.png)

## Requirements
* Node 12.x or later
* NPM

## Instructions
### Server
1. After cloning this repository, navigate into the *server* folder inside a terminal
1. Install the server dependencies by running *npm install*
1. Set the following environment variables:
    * BEE_URL: https://nytbee.com
    * DB_CONNECTION_STRING: A connection string to a postgres server
    * PORT: The port number to run on
1. Run *npm start*

### Client
1. Open a separate terminal and naviage to the repository's *client* folder
1. Install the server dependencies by running *npm install*
1. Run *npm start*
