global.userData;

const express = require('express');
require('dotenv/config');
const getBearerToken = require('../utils/oath/get-bearer-token')
const refreshAccessToken = require('../utils/oath/refresh-access-token');

const getUsersMe = require('../utils/recipes/get-users-me');

const { onStartup, updateUserData, getUserData } = require('../utils/data-crud/data-crud');

const verification = require('../verification/verify');
// const util = require('util');
const app = express();
const port = 8080;

onStartup();

app.use(async (req, res, next) => {
    const targetEmail = req.query.user_email;
    let retrievedUserData = getUserData(targetEmail);

    if (retrievedUserData) {
        // refresh access token

        retrievedUserData = await refreshAccessToken(retrievedUserData)
        updateUserData(targetEmail, retrievedUserData);
        req.bearerTokenDetails = retrievedUserData;
        next();
    } else {
        // add auth token to persistence
        let bearerTokenDetails = await getBearerToken(req, res);

        if (bearerTokenDetails) {
            req.bearerTokenDetails = bearerTokenDetails;
            let usersMe = await getUsersMe(bearerTokenDetails);
            updateUserData(usersMe, bearerTokenDetails);
            next();
        }
    }


})

app.get('/', async (req, res) => {
    const bearerTokenDetails = req.bearerTokenDetails;
    let results = await verification(bearerTokenDetails);
    res.json(results)
    // res.send(`
    //     <style>
    //         @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600&display=swap');@import url('https://necolas.github.io/normalize.css/8.0.1/normalize.css');html {color: #232333;font-family: 'Open Sans', Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;}h2 {font-weight: 700;font-size: 24px;}h4 {font-weight: 600;font-size: 14px;}.container {margin: 24px auto;padding: 16px;max-width: 720px;}.info {display: flex;align-items: center;}.info>div>span, .info>div>p {font-weight: 400;font-size: 13px;color: #747487;line-height: 16px;}.info>div>span::before {content: "👋";}.info>div>h2 {padding: 8px 0 6px;margin: 0;}.info>div>p {padding: 0;margin: 0;}.info>img {background: #747487;height: 96px;width: 96px;border-radius: 31.68px;overflow: hidden;margin: 0 20px 0 0;}.response {margin: 32px 0;display: flex;flex-wrap: wrap;align-items: center;justify-content: space-between;}.response>a {text-decoration: none;color: #2D8CFF;font-size: 14px;}.response>pre {overflow-x: scroll;background: #f6f7f9;padding: 1.2em 1.4em;border-radius: 10.56px;width: 100%;box-sizing: border-box;}
    //     </style>
    //     <div class="container">

    //         <div>
    //             User API Response
    //         </div>
    //         <div class="response">
    //             ${JSON.stringify(results, null, 4)}
    //         </div>
    //     </div>
    // `);
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})