const fetch = require('node-fetch');

const END_POINT = '/chat/users/me/contacts?type=external&page_size=10&next_page_token=';

module.exports = async (bearerTokenDetails) => {
        const contactsResp = await fetch(process.env.BASE_URL + END_POINT, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${bearerTokenDetails.access_token}` }
        });
        return await contactsResp.json();
}