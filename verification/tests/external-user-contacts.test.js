const getContacts = require('../../utils/recipes/get-contacts');

const test = async (bearerTokenDetails) => {
    let getContactsResponse = await getContacts(bearerTokenDetails);
    const testResult = {
        "Test Name": "External contacts validation test",
        passed: getContactsResponse.contacts.length === 0 ? true: false
    }

    return testResult;
}

module.exports = test;