/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to Cricket Sonic! India is playing Australia. How can I assist you today?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const AllIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            // && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        let speakOutput = '', showOutput = '';
        const intent = Alexa.getIntentName(handlerInput.requestEnvelope);
        switch(intent){
            case 'LiveCommentary':
                speakOutput = `<speak> Here is your live commentary. <audio src="https://v3.jovo.tech/audio/tiLUlbhW-virat-century.mp3"/>  </speak> `
                showOutput = "Here is your live commentary."
                break;
            case 'LiveCommentaryHindi':
                speakOutput = `<speak> Here is your live commentary in hindi. <audio src="https://v3.jovo.tech/audio/0pZ9rU9O-hindicommentary.mp3"/>  </speak> `
                showOutput = "Here is your live commentary in Hindi."
                break;
            case 'CurrentMatch':
                speakOutput = showOutput = "Sure! Currently, India is playing against Australia. India won the toss and chose to bat first. They have scored 180 runs for the loss of 3 wickets in 20 overs. Virat Kohli is the top scorer with 75 runs not out."
                break;
            case 'BattingStyle':
                speakOutput = showOutput = "Virat Kohli is playing exceptionally well. He is displaying a confident and aggressive batting style. His shots are precise, and he's dominating the bowlers with powerful drives and elegant cuts."
                break;
            case 'BowlingStyle':
                speakOutput = showOutput = "The Australian bowlers are trying hard to break this partnership. Mitchell Starc is bowling with great pace and accuracy, while Adam Zampa is relying on his spin variations to deceive the batsmen. However, Kohli seems to have figured them out and is playing confidently."
                break;
            case 'KeyMoments':
                speakOutput = showOutput = "Absolutely! In the 15th over, Virat Kohli hit a magnificent six over long-off, bringing the crowd to their feet. The atmosphere here is electrifying as the Indian fans cheer for their team."
                break;
            case 'PlayerStatistics':
                speakOutput = showOutput = "Certainly! Virat Kohli has scored 110 runs off 90 balls with a strike rate of 122. Dhoni, on the other hand, has scored 45 runs off 35 balls. Kohli has hit 12 boundaries and 2 sixes so far."
                break;
            case 'Predictions':
                speakOutput = showOutput = "Based on the current performance and player statistics, experts predict a 70% chance of India winning the match. However, cricket is unpredictable, and anything can happen in the remaining overs."
                break;    
            case 'MatchUpdates':
                speakOutput = showOutput = "Of course! I will keep you updated on any significant events, like wickets, boundaries, or milestones reached by the players. Enjoy the match, and feel free to ask if you have any more questions or if you want updates on the game."
                break; 
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withSimpleCard("Cricket Sonic", showOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AllIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();