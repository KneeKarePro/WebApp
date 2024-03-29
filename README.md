# WebApp
Software web app for the Knee Care Pro project

### Main Contributers
Daniyal Ansari \
Nicole Meers

## Completed Work
* App can launch and has completed basic setup, and has implemented the KneeKarePro logo and styling. 
* Users can login to their profile.
  * A user can choose to login as a patient or as a clininican, and will be taken to their own login portal.
* Once a patient is logged in, they are prompted to connect the device they are using.
* Once a clinician has logged in, they are able to view all of their patients.


### Work Flow
[Work Record Blog](https://kneekarepro.blogspot.com/)

## Project Architecture
This is a javascript web app that will allow users to login to their respective portal and view their data.\
This web app will connect to the ESP32, which will be connected to the Adafruit Rotary Trinkey on the brace itself.
The connection will be done via API connect over bluetooth.\
The rotary and sensory data that is collected will be sent to the web app.
Patient users will be able to upload their data over this connection, and clinician users will be able to view the data that is uploaded with respect to each patient they have.

### Goals
To be able to read all data from the brace for each patient such that all relevant data is available to the clinician via web app.

### Timeline
* Have the web app establish connection via bluetooth with the ESP32 chip
  * Over avenues of connection are available and may be implemented instead of bluetooth
* Have a method to store data that is transmitted to the web app
* Polish the interface and increase efficacy of user-navigation
  * Allow for clinicians to add/remove patiens
  * Allow for detailed view of patients to the clinican
  * Patients can review their data

## Known bugs
N/A

### Additional Progress
_The ESP32 is currently not connected to the web app._
