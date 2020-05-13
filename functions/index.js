'use strict';

const {
  dialogflow,
  Suggestions,
  SimpleResponse,
} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

// Defining sounds
const gameWin = `https://cognifistudios.files.wordpress.com/2020/02/game-win-sound-effect.ogg`;
const footsteps = `https://actions.google.com/sounds/v1/foley/footsteps_grit.ogg`;
const breach = `https://actions.google.com/sounds/v1/doors/wood_door_close_hard.ogg`;
const yell = `https://actions.google.com/sounds/v1/human_voices/death_impact_yell_single.ogg`;
const engine = `https://actions.google.com/sounds/v1/transportation/engine_start_up.ogg`;
const megaWin = `https://cognifistudios.files.wordpress.com/2020/04/bigwin.ogg`;

// Special message string
const speTxt = `Congratulations! You found all three special endings 🥳🎉
Be sure to check back, updates are coming soon!`;
const speSpch = `Congratulations! You found all three special endings!<audio src='${megaWin}' />
Be sure to check back, updates are coming soon!`;

// Response for special endings
const DF2Txt1 = `Agent Jones sneaks around back and you wait at the front for her signal. ` +
  `A few minutes go by and you start to wonder if you should check in. ` +
  `Suddenly you hear someone behind you. You turn and see Jones with a young boy, it must be Juan! ` +
  `She gets him in the car and tells him to stay put. ` +
  `Jones then approaches you at the front door and advises that the two of you push forward with the breach. ` +
  `On her signal, you burst through the door and catch the suspect off guard. ` +
  `Being outnumbered, Tracy submits and you put her in cuffs.`;
const DF2Txt2 = `You found a secret ending. Job well done! 🥳🎉
Would you like to play again?`;
const DF2Spch1 = `Agent Jones sneaks around back and you wait at the front for her signal. ` +
  `A few minutes go by and you start to wonder if you should check in. ` +
  `Suddenly you hear someone behind you.<audio src='${footsteps}' clipEnd="1.7s" /> ` +
  `You turn and see Jones with a young boy, it must be Juan! ` +
  `She gets him in the car and tells him to stay put. Jones then approaches you at the front door ` +
  `and advises that the two of you push forward with the breach. On her signal,<audio src='${breach}' clipEnd="1.8s" /> ` +
  `you burst through the door and catch the suspect off guard. Being outnumbered, Tracy submits and you put her in cuffs.`;
const DF2Spch2 = `<audio src='${gameWin}' clipEnd="6s" />You found a secret ending. Job well done!
Would you like to play again?`;

const DF3TS1 = `Now that Agent Jones is gone, you can finish your secret mission. Once in your office, ` +
  `you shred the fingerprints and the receipt. After that, you corrupt the footage on the flash drive ` +
  `and send it to Eugene. He responds and says he’ll analyze the video as fast as possible. 
When Jones returns, you tell her that Eugene is analyzing the evidence. After you eat, `+
  `he calls to inform you that the footage cannot be analyzed despite trying every trick he knew. ` +
  `You tell Jones that the evidence is inconclusive and she knows it’s too late to search for more. ` +
  `Woah! You successfully sabotaged the evidence for a high paying client.`;
const DF3Txt2 = `Well done double agent, you found a secret ending! 😎🤫
Wanna keep playing?`;
const DF3Spch2 = `<audio src='${gameWin}' clipEnd="6s" />Well done double agent, you found a secret ending!
Wanna keep playing?`;

const DF6Txt1 = `Jones is right on this one. You grab Juan and run for the entrance. ` +
  `When you reach the front door, you hear someone swear in the back room. They're onto you. ` +
  `You all run into the car and you start the engine. As you drive away, you see someone chasing you on foot. ` +
  `It looks like he is making a phone call to signal for backup. But ultimately it is no matter, ` +
  `you turn onto the main road and escape.`;
const DF6Txt2 = `You found a secret ending. Well done! 🥳🎉
Would you like to play again?`;
const DF6Spch1 = `Jones is right on this one. You grab Juan and run for the entrance. ` +
  `When you reach the front door, you hear someone swear in the back room.` +
  `<audio src="${yell}" clipEnd="1s" /><say-as interpret-as="expletive">shoot</say-as><break time=".8s"/> ` +
  `They're onto you. You all run into the car and you start the engine.` +
  `<audio src="${engine}" clipEnd="2s" /> As you drive away, you see someone chasing you on foot. ` +
  `It looks like he is making a phone call to signal for backup. But ultimately it is no matter, ` +
  `you turn onto the main road and escape.`;
const DF6Spch2 = `<audio src="${gameWin}" clipEnd="6s" />You found a secret ending. ` +
  `Well done! Would you like to play again?`;

// Variable that tracks special endings found
var special = 0;

// Intents for special endings
app.intent('DF2', (conv) => {
  // Clear contexts to prevent potential backtracking 
  conv.contexts.delete('DF1'), conv.contexts.delete('DF2'), conv.contexts.delete('DE2-followup'),
  conv.contexts.delete('DE1'), conv.contexts.delete('DE2'), conv.contexts.delete('DD1-followup'),
  conv.contexts.delete('DD1'), conv.contexts.delete('DD5'), conv.contexts.delete('DC1-followup');
  // Iterate special counter
  special++;
  // Response if all endings are found
  if (special > 2) {
    conv.close(new SimpleResponse({
      text: DF2Txt1,
      speech: `<speak>${DF2Spch1}</speak>`
    }))
    conv.close(new SimpleResponse({
      text: speTxt,
      speech: `<speak>${speSpch}</speak>`
    }))
  }
  // Default response
  else {
    conv.ask(new SimpleResponse({
      text: DF2Txt1,
      speech: `<speak>${DF2spch1}</speak>`
    }))
    conv.ask(new SimpleResponse({
      text: DF2Txt2,
      speech: `<speak>${DF2Spch2}</speak>`
    }));
    conv.ask(new Suggestions('Yes!', 'Nope'));
  }
});

app.intent('DF3', (conv) => {
  conv.contexts.delete('DF3'), conv.contexts.delete('DF4'), conv.contexts.delete('DE4-followup'),
  conv.contexts.delete('DE3'), conv.contexts.delete('DE4'), conv.contexts.delete('DD2-followup'),
  conv.contexts.delete('DD2'), conv.contexts.delete('DD3'), conv.contexts.delete('DC2-followup');
  special++;
  if (special > 2) {
    conv.close(new SimpleResponse({
      text: DF3TS1,
      speech: `<speak>${DF3TS1}</speak>`
    }))
    conv.close(new SimpleResponse({
      text: speTxt,
      speech: `<speak>${speSpch}</speak>`
    }))
  }
  else {
    conv.ask(new SimpleResponse({
      text: DF3TS1,
      speech: `<speak>${DF3TS1}</speak>`
    }))
    conv.ask(new SimpleResponse({
      text: DF3Txt2,
      speech: `<speak>${DF3Spch2}</speak>`
    }));
    conv.ask(new Suggestions('Yes!', 'Nope'));
  }
});

app.intent('DF6', (conv) => {
  conv.contexts.delete('DF1'), conv.contexts.delete('DF2'), conv.contexts.delete('DE2-followup'),
  conv.contexts.delete('DE1'), conv.contexts.delete('DE2'), conv.contexts.delete('DD1-followup'),
  conv.contexts.delete('DD1'), conv.contexts.delete('DD5'), conv.contexts.delete('DC1-followup');
  special++;
  if (special > 2) {
    conv.close(new SimpleResponse({
      text: DF6Txt1,
      speech: `<speak>${DF6Spch1}</speak>`
    }))
    conv.close(new SimpleResponse({
      text: speTxt,
      speech: `<speak>${speSpch}</speak>`
    }))
  }
  else {
    conv.ask(new SimpleResponse({
      text: DF6Txt1,
      speech: `<speak>${DF6Spch1}</speak>`
    }))
    conv.ask(new SimpleResponse({
      text: DF6Txt2,
      speech: `<speak>${DF6Spch2}</speak>`
    }));
    conv.ask(new Suggestions('Yes!', 'Nope'));
  }
});

exports.yourAction = functions.https.onRequest(app);
