# The Count of Money

#Documentation 

##Run with docker compose 

```
cd the-count-of-money/
docker-compose build
docker-compose up
```

api should be running in port 5000 and client should be running on port 3000

##Work in development

###Get started with API 

####Run API in development env 

```
cd the-count-of-money/
cd api/
npm run serve
```
####Run the API with Docker 

Find the api/ folder

```
cd the-count-of-money/
cd api/
```

Build the Docker image 

```
docker build -t <your username>/the-count-of-money-api .
```

Run the Docker image and redirect the port

```
docker run --name the-count-of-money-api -p 5000:5000 -d <your username>/the-count-of-money-api
```

Test the api 

```
curl -i localhost:5000

# Should print 

Hello World
```

###Get started with Client 

####Run API in development env 

```
cd the-count-of-money/
cd client/
npm run start
```

####Run the Client with Docker 

Find the api/ folder

```
cd the-count-of-money/
cd client/
```

Build the Docker image 

```
docker build -t <your username>/the-count-of-money-client .
```

Run the Docker image and redirect the port

```
docker run --name the-count-of-money-client -p 3000:3000 -d <your username>/the-count-of-money-client
```

You navigate go to localhost:3000 

#Product Canvas 

## Team

### Back

Mathieu
Antoine

### Front 

Clément
Youness

### Project Management 

- Youness

## Concept

Thanks to « The Count Of Money » web application you can track crypto currencies market data and follow news so that you won’t miss any valuable information or missed an opportunity. 

## MVP

A dashboard displays a real-time market data about crypto currencies pre defined by an admin and a feed of latest news from a RSS feed.

## Competitors

https://coinmarketcap.com/fr/
https://courscryptomonnaies.com/

## Target group 

Crypto Enthusiast (~ 30yo) - Curious Investor (~ 45yo) - Crypto Newbie (~ 20yo)

## Core functions 

### Anonymous user

- Real-time market data
- Latest news about crypto currencies

### Authenticated user 

- Real-time market data
- Choose your market data preferences
- Latest news about crypto currencies 
- Enable users to browse from various news categories (keywords)
- User can manage and save his preferences 

### Admin 

- Can define the global market data preferences for all users
- Can config the RSS feed for the news

## Characteristics / Features 

- Real-time crypto currency market data (high priority)
- Crypto currency news feed (high priority)
- User authentication
- Authenticated User preferences panel
- Admin panel
- Great UX/UI - User Friendly
- Fully responsive

# Web Application Architecture

## Back End

Rest API build with Node JS + Express + LoopBack + Mongoose 

## Front End

Stack: React JS + ReactDOM + React Router + Axios

### Dynamic UI interface with React

React lets us build a web application using elementary components bricks. Each component is connected to data fetched from our backend server and render them as UI element. Each component is isolated in a separated module (JS file) with its own data and logic. We use Axios, a third party library, to make API request from the front end application. 

### State Management

Our philosophy is to keep the state local as possible and use react context only when props drilling become a problem and we 

### Single Page Application (SPA)

A single page application interacts with the user though a single page that is dynamically updated with new data from the web server instead of visiting a new brand page in the browser. We use React Router as a third party library to navigate though the different page component of our application without leaving the current page of the browser.

https://reactrouter.com/

## Data Base 

MongoDB

