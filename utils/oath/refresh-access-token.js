const fetch = require('node-fetch');
const fs = require('fs');
const basicEncoding = require('../encoding/basic-encoding');

module.exports = async (retrievedUserData) => {
    const ZOOM_GET_AUTHCODE = `https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${retrievedUserData.refresh_token}`;
    const url = ZOOM_GET_AUTHCODE + '&redirect_uri=' + process.env.redirect_url;
    const opts = {
        method: "POST",
        headers: { 
            "Authorization": `Basic ${basicEncoding()}`,
            "Content-Type": "application/x-www-form-urlencoded"
        },
    }
    let resp = await fetch(url, opts);
    let respJson = await resp.json()
    console.log('refreshed access token response =>', JSON.stringify(respJson, null, 4))
    return respJson;
}