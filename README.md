# WebApp
Software web app for the Knee Care Pro project

### Contributers
Daniyal Ansari

## Completed Work
* App can launch and has completed basic setup, and has implemented the KneeKarePro logo and styling. 
* Users can login to their profile.
  * A user can choose to login as a patient or as a clininican, and will be taken to their own login portal.
* Once a patient is logged in, they are prompted to connect the device they are using.
* Once a clinician has logged in, they are able to view all of their patients.
* A Websocket connection to the ESP32 has been established
* API connection to Flask webserver has been established
* Bugs in reading ESP data have been resolved
* User Profile has been stylized with CSS


### Work Flow
[Work Record Blog](https://kneekarepro.blogspot.com/)

## Project Architecture
This is a javascript web app using React and Node.js that will allow users to login to their respective portal and view their data
This web app will connect to the ESP32, which will be connected to a potentiometer on the brace itself and the Flask Backend.
The connection will currently be done via connection over the ESP32's hosted BLE processor.
The connection will be transmited via an API connection commming from the Flask Backend which recevied the data.
The rotary and sensory data that is collected will be sent to the web app.
Patient users will be able to see a realtime update of their data over this connection, and clinician users will be able to view the data that is uploaded with respect to each patient they have.

### Goals
To be able to read all data from the brace for each patient such that all relevant data is available to the patient and clinician via the web app.

### Timeline
* Have the web app establish connection with the ESP32 chip
  * For our first demonstration, we will connect the web app with the ESP32 chip over its own wifi
  * Our end goal is to have the web app establish a connection via bluetooth with the ESP32 chip
* Have a method to store data that is transmitted to the web app
* Polish the interface and increase efficacy of user-navigation
  * Allow for clinicians to add/remove patiens
  * Allow for detailed view of patients to the clinican
  * Patients can review their data

## Known bugs
N/A

### Additional Progress
_The ESP32 can successfully host its own wifi and establish a connection via websocket._\
_We will transition to using a potentiometer to measure the rotation of the knee brace._
_The web app can scuessfully stream data over an API connection comming from the Flask Backend_\
