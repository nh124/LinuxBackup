# PlayerMatching

## Welcome

Welcome to my PlayerMatching App project. This app is completed using 2 separate APIs and one Python framework. Heroku is used for deployment.
Flask is a Python framework that helps with routing and fetching, and also with Markdown document layouts.

### What is a Framework?

- A Framework provides a structure that makes it easy to create and scale applications.
- Works well with requests and responses.
- Routing URLs to appropriate handles.
- Allows interaction with database with ease and less code.
- Requires authentication.
- Supports JSON and HTML formatted outputs.

### What is an API?

- An API allows programs to speak to each other given the rules.
- Makes it easy to use powerful functionality of the existing application with no extra work

### REST API or Representational State Transfer

- APIs have subsets: WebAPI, REST API, etc.
- REST API communicates with the servers to get response data, which is used on the client-side as a request URL.
- REST API is stateless: where the server does not store data between requests

### Technical Problems

- Linking the Wiki page to the banner/image of the movie.
  - This problem was resolved by changing the return format of movie_wiki from `return json.dump(data)` to `return data`.
- Having the random movie being displayed with each refresh was not functioning properly. The class would return the correct movie which is randomly generated, but the movie would not be updated with each refresh. This update only worked when the program was terminated and then re-compiled.
  - This problem was resolved by initializing a random variable inside my app class, and then the random number was generated in my index function.
  - Then this was passed into the class where the movies were housed so the proper movie would be returned given the random index of the dictionary.
  - Reasoning behind this problem could extend from the page was updated based on the app class returns, because the random was being generated in another class it had no access to that random value/movie

### Current Flaws

- This App has one minor problem: The page could sometime display the same movie it did in the last refresh
  - This is extending from the random number that is being generated might be the same as the last one.
  - A working solution might involve storing the previously generated index and comparing it to the newly generated one
  - This could simply be accomplished by storing the generated indexes inside an array, afterward conditionally checking if the new index is in the array.
- This App also has some problems with dynamic sizing. So shrinking the page to the size of phones cause the content to overflow
  - A working solution could involve using dynamic values such as `50%` or `3em` as to static values such as `50px`.

## Installation

This guide will show you how to run this project on your local machine. You will need the following tools to run the program:

- Python.
- Python dotenv.
- Flask.
- requests.
- SQL-Alchemy
- Heroku
- React
- Node

### Windows

For all windows install WSL for the Microsoft store.

- Put in your credentials and use the following command to make the necessary updates

```
sudo apt update
```

### Linux/MAC

Open up the terminal and run the following command:

```
sudo apt update
```

#First Download from [Node](https://nodejs.org/en/download/)

### Installing Tools

- Install python: `sudo apt install python`
- Install Flask: `pip install flask`
- Install python dotenv: `pip install python-dotenv` or `pip3 install python-dotenv`
- Install requests: `python -m pip install requests`
- In SQL-Alchemy

```
   sudo apt install postgresql
   sudo service postgresql start
   pip3 install psycopg2-binary
   pip3 install Flask-SQLAlchemy==2.1
   pip3 install Flask twilio
```

- To create a react app `npx create-react-app my-app`
  Or
- Download the file from this repository and run `npm install` this will create a reate node models folder which whill allow you to run you flask app with node server. Everytime editing react file execute `npm run build` and then python3 <appname>.py
- Heroku: https://signup.heroku.com/login

### Key

In order to work with the API in your local machine, it is required to get the API key. This project is using the TMDB API and Wiki API. The wiki API does not require any authentication.
For Authentication in TMDB use the following steps:

- First, create an account in the [TMDB](https://www.themoviedb.org/?language=en-US) Website
- Once you are logged in, click your Profile Icon in the top right corner and then select Settings.
- On the left side menu click API and then click Create in the middle of your screen.
- Fill out this form asking you for your address, phone number, and other information. You can use real or fake information, it doesn’t matter. At the end of this screen when you - - - submit the information, you will be given a TMDB API Key.

### Using the Key

Now that you have received the key you need to let the program know what that key is for authentication purposes.

- First, create a `.env` file in the same repository where the app is located.
- Inside the `.env` file place the key.

### This app also uses Databases

To have your database working create a free accout at heroku and download it you operating system. Once installation is complete open you terminal and run the following commands: - First login by running `heroku login` - No you will need to create your react app to load the database. To do so run `heroku create <Appname>` replace <Appname> with a app name of you choice. - Next we need to initialize the database. To do so run `heroku addons:create heroku-postgres:hobby-dev -a <Appname>` replace <Appname> with with app name you got when you created your heroku app. - Now we need to get access to the databsae so we can start adding stuff to it. To do so run `heroku config -a <Appname>` replace <Appname> with with app name you got when you created your heroku app. - This will give you a url create a .env file add the following:
` Database_url : "postgres://......." `
Note: Make sure to change postgres to postgresql.

### Finish

Great! you have installed the application.
This application is also available at this link: [PlayerMatching](https://nameless-beach-30711.herokuapp.com/)
