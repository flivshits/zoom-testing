module.exports = () => {
    let encoded = Buffer.from(process.env.client_id + ":" + process.env.client_secret).toString('base64');
    console.log(`encoded => ${encoded}`)
    return encoded;
}