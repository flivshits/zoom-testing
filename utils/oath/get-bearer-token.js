const basicEncoding = require('../encoding/basic-encoding');
const fetch = require('node-fetch');

const ZOOM_GET_AUTHCODE = 'https://zoom.us/oauth/token?grant_type=authorization_code&code=';
const ZOOM_AUTH = 'https://zoom.us/oauth/authorize?response_type=code&client_id=';

module.exports = async (req, res) => {
    console.log('endpoint struck')
    const authCode = req.query.code;

    if (authCode) {
        console.log("returning authcode =>", authCode);

        const url = ZOOM_GET_AUTHCODE + authCode + '&redirect_uri=' + process.env.redirect_url;
        const opts = {
            method: "POST",
            headers: { "Authorization": `Basic ${basicEncoding()}` },
        }
        console.log('about to send opts =>', opts)
        let resp = await fetch(url, opts);
        return await resp.json();
    }

    // If no auth code is obtained, redirect to Zoom OAuth to do authentication
    console.log('redirecting');

    res.redirect(ZOOM_AUTH + process.env.client_id + '&redirect_uri=' + process.env.redirect_url)
}