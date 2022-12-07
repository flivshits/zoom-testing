const fetch = require('node-fetch');

const END_POINT = '/users/me/';
module.exports = async (bearerTokenDetails) => {
    
    const usersMeResp = await fetch(process.env.BASE_URL + END_POINT, {
        method: "GET",
        headers: { 'Authorization': `Bearer ${bearerTokenDetails.access_token}` }
    });
    const userMe = await usersMeResp.json();

    return userMe.email
}