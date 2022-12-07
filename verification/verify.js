const fs = require('fs');

const LOCATION = './verification/tests/';

module.exports = async (bearerTokenDetails) => {
    const testsFiles = fs.readdirSync(LOCATION);
    console.log('tests =>', testsFiles)
    let tests = [];
     testsFiles.forEach(testFile => {
        console.log("PATH!! =>", LOCATION + testFile)
        const test = require("./tests/" + testFile.toString());
        tests.push(test)
     })
    console.log('tests =>', tests)

    let resultSet = await Promise.all(tests.map(async test => await test(bearerTokenDetails)));
    console.log(`Result Set => ${JSON.stringify(resultSet, null, 4)}`)
    return resultSet;

}