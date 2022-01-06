# Cognito MFA authentication via Email

##  Still a work in progress!

Doing this as proof of concept for a work project. The project is very simple and doesnt have any fancy frontend frameworks to use so i will be doing this with the Amazon Cognito Identity sdk.

The authentication flow is: 

user enters username and password 
->
username and password are correct
->
custom challenge is created -> code is sent to users email 
->
user is then prompted to enter code 
->
code entered is sent to verify trigger which is validated with code created in the create trigger

## Setup Project:

### Git clone this repo 

git clone https://github.com/CameronP2018/Cognito-email-mfa.git

### Create a S3 Bucket 

upload Login.html, aws-cognito-sdk.min.js, amazon-cognito-identity.min.js

go to S3 bucket properties and turn on static website hosting -> choose login.html as the Index document

### Create the lambda triggers

create a lamda trigger for each of the triggers in the repo 

simply copy the code and paste it in to seperate lambda functions

### Create the user pool 

Create a user pool in AWS cognito console

you can change the password policy to make it easier for testing (short password and no special characters etc)

MAKE SURE TO HAVE MFA TURNED OFF. MFA will be sent via email so we dont need it on

In the triggers section add the triggers created earlier to corresponding cognito triggers i.e define, create and verify
