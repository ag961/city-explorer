# City Explorer App (Lab 07)

**Deployed URL**: https://city-explorer-ayrat.netlify.app/
**Author**: Ayrat Gimranov
**Version**: 1.0.3 (increment the patch/fix version number if you make more commits past your first submission)


## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->
In this lab we replace weather placeholder with data from weather API, that is requested by our back-end server, and then processed and sent back to front-end. We also add info about movies whose title contains the name of the city we searched for.

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
- mpn install express, cors, dotenv.

- Set up a new server.

- compose a url to request data from back-end.

- Handle the request from front-end using .find(), then popualting an array with necessary data.

- Send the data to front-end.

- Display the results using react-bootstrap

- code try/catch to handle errors

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
- Langauges - HTML, CSS, JavaScript
- Libraries - React, React-bootstrap, Axios,
- Tools - GitHub, Netlify, Heroku, Trello, Creatly  

![UML](./src/img/lab08-uml.png)

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource. -->
8/5/2021 2 am - Feature 1: Displaying movie data.
8/5/2021 8.23 am - Feature 2 complete: Displaying movie data.
8/2/2021 9.50 am - Feature 3 complete: Sever deployed on Heroku.




## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
Classmates: Quentin, Willem, Clarissa
Staff: Ryan Gallaway

---------------

Name of feature 1: Weather (live): As a user of City Explorer, I want to see weather info for the city I searched, so that I know how to pack for an upcoming trip.

Estimate of time needed to complete: 2 hrs

Start time: 9 pm

Finish time: 2.13 am

Actual time needed to complete: 5 hours

-------

Name of feature 2: Movies: As a user of City Explorer, I want to see info about movies related to the city I searched, so that I can learn more about the destination.

Estimate of time needed to complete: 4 hrs

Start time: 2.15 am

Finish time: 8.20 am

Actual time needed to complete:  6 hours

--------

Name of feature 3: Publish: Deploy your server. As a user, I want to access the City Explorer application on the web, so that anyone can explore from anywhere.

Estimate of time needed to complete: 1 hr

Start time: 8.30 am

Finish time: 9:50 am

Actual time needed to complete: 1.20
