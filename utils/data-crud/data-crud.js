const fs = require('fs');
const DATA_FILE = './persistent-user-data/user-data.json'
const onStartup = () => {
    if (fs.existsSync(DATA_FILE)) {
        let rawData = fs.readFileSync(DATA_FILE)
        global.userData = JSON.parse(rawData)
    } else {
        global.userData = {}
    }
}

const updateUserData = (user, data) => {
    userData[user] = data;
    fs.writeFileSync(DATA_FILE, JSON.stringify(userData))
}

const getUserData = (userEmail) => {
    let foundEmail = Object.keys(userData).find(user => userEmail == user);
    if (foundEmail) {
        return userData[foundEmail]
    }
    return null;
}

module.exports = {
    onStartup,
    updateUserData,
    getUserData
}