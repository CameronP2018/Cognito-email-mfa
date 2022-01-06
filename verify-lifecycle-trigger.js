exports.handler = async(event, context, callback) => {
    const expectedAnswer = event.request.privateChallengeParameters["verificationCode"];
    if (event.request.challengeAnswer === expectedAnswer) {
        event.response.answerCorrect = true;
    } else {
        event.response.answerCorrect = false;
    }
    return event;
};