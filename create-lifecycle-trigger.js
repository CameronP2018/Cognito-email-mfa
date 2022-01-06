import * as crypto from "crypto";
import { SES } from 'aws-sdk';
import { CognitoUserPoolTriggerHandler } from 'aws-lambda';

const ses = new SES();

export const handler = CognitoUserPoolTriggerHandler = async event => {

    let verificationCode= '';
    
    //Only called after SRP_A and PASSWORD_VERIFIER challenges.
    if (event.request.session.length == 2) {
        const n = crypto.randomInt(0, 100000);
        verificationCode = n.toString().padStart(6, "0");
        
        const minimumNumber = 0;
        const maximumNumber = 100000;
         
        const verificationCode = Math.floor(Math.random() * maximumNumber) + minimumNumber;
         
    await sendMail(event.request.userAttributes.email, verificationCode);
    }
    else {
        //if the user makes a mistake, we pick code from the previous session instead of sending new code
        const previousChallenge = event.request.session.slice(-1)[0];
        verificationCode = previousChallenge.challengeMetadata;
    }
        
    //add to privateChallengeParameters, so verify auth lambda can read this. this is not sent to client.
    event.response.privateChallengeParameters = { "verificationCode": verificationCode };
    //add it to session, so its available during the next invocation.
    event.response.challengeMetadata = verificationCode;
    
    return event;
    }
    
    async function sendMail(emailAddress, secretLoginCode) {
    const params = {
        Destination: { ToAddresses: [emailAddress] },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<html><body><p>This is your secret login code:</p>
                           <h3>${secretLoginCode}</h3></body></html>`
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: `Your secret login code: ${secretLoginCode}`
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Your secret login code'
            }
        },
        Source: 'cameron.purves@hotmail.co.uk'
    };
    await ses.sendEmail(params).promise();
}