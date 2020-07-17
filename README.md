# Short.ly - the URL Shortener
![Node.js CI](https://github.com/codejockie/url-shortener/workflows/Node.js%20CI/badge.svg?branch=main)

## Installation and Setup
+ Navigate to a directory using your favourite terminal.

+ Clone this repository to that directory.

+ Using SSH: `$ git clone git@github.com:codejockie/url-shortener.git`

+ Using HTTPS: `$ git clone https://github.com/codejockie/url-shortener.git`

+ Run the command: `$ cd url-shortener`, then follow either of the following two steps:

### Using Local Dev Machine

  + #### Client
    + `$ cd client`
    + `$ npm install or yarn install`
    + `$ npm run serve or yarn serve`

  > Ensure MongoDB is installed on your development machine.

  + #### Server
    + `$ cd server`
    + `$ npm install or yarn install`
    + `$ npm run dev or yarn dev`


### Using Docker
> Ensure you have docker installed, before proceeding. Also that these ports `[4000, 8080]` are free on your computer.

+ Run the command `$ docker-compose up --build`

#### Production mode
+ Run the command `docker-compose -f docker-compose-prod.yml up --build` to use production build.

Other Docker commands:

- `docker build -t vue-app .`
- `docker run -it -p 8080:8080 --rm --name url-shortener vue-app`

Now the app should be running on port `8080` (development) for the Vue app and port `4000` for the API.

+ http://127.0.0.1 - Vue App (production)
+ http://localhost:8080 - Vue App (development)
+ http://localhost:4000 - REST API