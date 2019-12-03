# ChannelX

SER517 Fall 2019 Group 4 project

A react based Web application developed using Firebase.

ChannelX will make it possible to create, share, and destroy transient communication channels. These channels are tied to users existing communication streams (e-mail, Social accounts etc.) without exposing the users actual phone number or e-mail address.

The application is available to use through https://channelx-714c6.firebaseapp.com/

The application is developed by:
1. Darshan Prakash
2. Hongfei Ju
3. Manisha Miriyala
4. Muhammed Sami
5. Subhradeep Biswas

Instructions to run the application
1. Add the keys.js file from group project google drive (https://drive.google.com/drive/u/0/folders/1Mr3YlrGnhe6E63B3xkjLJx95urqd8fba) to /src/contants/keys/ directory, since this file contains the firebase SDK keys.
2. After cloning the project, open command prompt in our source directory.
3. Make sure npm is installed and make sure you are using version 11.x.x.
4. Clone the repository and run ```npm install``` to install node modules in Frontend/channelx/ which is the project root directory.
5. Run ```npm install --save firebase``` to save firebase modules.
6. Run ```npm install --save @material-ui/core``` to save modal modules.
7. Run ```npm install @material-ui/icons``` to save delete/edit icons.
8. Run ```npm install --save react-dates moment@>=#.## react@>=#.## react-dom@>=#.##```.
9. Run ```npm install @material-ui/pickers``` .
10. Run ```npm install @date-io/date-fns``` .
11. Run ```npm install date-fns@next @date-io/date-fns``` .
12. Run ```npm install --save react-dates moment``` .
13. Run ```npm install react-bootstrap-sweetalert``` .
14. Run ```npm install sweetalert --save``` .
15. Run ```npm audit fix``` if there are any warnings or error with your version of npm.
16. Run ```npm start``` to start the the application. It will open up in the browser at ```http://localhost:3000```.
17. You will be taken to the landing page where you can select Register button which will take yoy to Signup Page.
18. Enter your details and click ```submit``` to register. You will be taken to home page if your email address is valid.
19. Click on signout in Home page to log out of application.
