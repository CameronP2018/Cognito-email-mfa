Cognito MFA authentication via Email

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
