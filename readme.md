NOTE: Cannot complete initial login to zoom programatically, with reference => https://devforum.zoom.us/t/programmatic-way-to-login-user/52638/2

Greetings,

In this document we will walk through the setup of this micro API testing framework.

Pre-Requisites:
    1)  Install Node JS v17.4.0 and Node Package Manager 8.3.1
    2)  Go to the Zoom market place (https://marketplace.zoom.us/), and select the Develop (top right) => Create app => OAuth => User-managed app
        and fill in as necessary, making sure to copy:
        a)  Client Id and Client Secret (App Credentials)
        b)  Secret Token and Verification Token (Feature)
        c)  Add scopes: All for User and Team Chat
        d)  Create a .env file in the root directory and fill with appropriate values the following:
           i)   client_id=<your client id> => Zoom Platform
           ii)  client_secret=<your client secret> => Zoom Platform
           iii) redirect_url=<your redirect url> => will generate 
           iv)  BASE_URL=https://api.zoom.us/v2 => leave this hardcoded
           v)   secret_token=<your secret token) => Zoom Platform
           vi)  verification_token=<your verification token> => Zoom Platform
           
    3)  If you do not have a means of hosting, you can host locally, but because you'll need to redirect to an accessible URL you will need to install ngrok
        a)  Go to https://ngrok.com/, create an account and download the solution that we will later use to tunnel to external location from localhost, or 
        b)  In the terminal run the following command: ngrok http 8080 (KEEP THIS RUNNING, copy the "Forwarding" url)
        c)  Paste the forwarding url in:
           i) the .env file for "redirect_url"
           ii) Zoom platform => manage => your app => App Credentials in both the "Redirect URL for OAuth" and "Add allow lists"
    
How it works:
The user needs to be prompted to install the app, but only once.  This can be seen as preconditioning of the data, and is a limitation of 
testing on the Zoom platform - this is security concern for them, as they don't want to have simply anyone accept unkown apps and have to
deal with unforseen consequences.  Once accepted, this can be run from a browser, postman or any other app capable of sending a get request

setup & usage:
    1) In a seperate terminal run "npm install" to install the various node modules required
    2) In the root directory run "npm start"
    3) For sample execution open your browser, and type the following "http://localhost:8080?user_email=<email associated with zoom>
    4) Additional tests can be added to the "root folder/verification/tests" directory.  Every test is passed an Access Token, and prior to the tests being
       executed, the Access Token is refreshed, insuring that the execution will be valid.  The execution itself is handled in parallel, so
       all tests should be independant.  Perhaps at later stage, I will enable additional options to execute in a specific series, but for this
       POC parallel is all there is.

Pending tasks:
    1) Create a cli component that will allow selection of the specific tests
    2) Additional Tests to be made
    3) A seperate workflow for preconditioning user values