# Social-Network-API

## Description

In this project, I was tasked with creating a social network back end that used a NoSQL database (MongoDB). The application is setup to add and delete thoughts to and fromusers, add and delete reactions to and from the thoughts, and add and delete friends from user accounts.
Users will be able to utilize a functioning back end to create a social network application.

## Table of Contents
[Install](#install)
[Overview](#overview)
[Screenshots](#screenshots)
[Links](#links)

## Install
To install the application, you will need to install the required npm packages for the project by running 'npm i' in a command line terminal.
After the install is complete, run 'npm run seed' and then 'npm start' to start the application with a seeded database at `http://localhost:3001`.

## Overview

 - For this project, I used Express.js to help serve the back end and Mongoose for the noSQL database (MongoDB). I also used the build in JavaScript Date object to help format created dates for thoughts and reactions.
 - When the application is started (and the database has been seeded), the user will be able to query the API endpoints to view or modify user, thought, friends, or reactions data.
 - If the correct endpoint is selected and the request body and parameters are correct, users will be able to create new users, reactions, thoughts, and friend connections through the API itself. 
 - When a thought or reaction is created, the date is formatted to one that is easier to read and understand.


## Screenshots

<img src="https://github.com/JacobYaws/Social-Network-API/blob/main/assets/Assign18Screenshot1.png">
<img src="https://github.com/JacobYaws/Social-Network-API/blob/main/assets/Assign18Screenshot2.png">

## Links

-Github link: https://github.com/JacobYaws/Social-Network-API

    -To download, navigate to the repository and click on the green 'Code' button. Copy the ssh link and clone it in a terminal by using 'git clone git@github.com:JacobYaws/Social-Network-API.git'

-Link to demonstrational video: https://drive.google.com/file/d/19zNi_5k_NB2ETwENwr5w69DOGUmd5GPz/view
