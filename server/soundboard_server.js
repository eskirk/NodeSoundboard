const express = require('express');
const app = express();
const port = process.env.PORT || 4200;
const bodyParser = require('body-parser');
const player = require('play-sound')();
let messages = [];

var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

var textToSpeech = new TextToSpeechV1({
   username: '7547f24f-9533-4546-b8c2-56acdbb389d5',
   password: '3aWUGEud6CvV',
   url: 'https://stream.watsonplatform.net/text-to-speech/api/'
});

app.use(function(req, res, next) {
   console.log("Handling " + req.path + '/' + req.method);
   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   res.header("Access-Control-Allow-Credentials", true);
   res.header("Access-Control-Allow-Headers", ["Content-Type", "Location"]);
   res.header("Access-Control-Expose-Headers", ["Location"]);
   res.header("Access-Control-Allow-Methods", ["DELETE", "PUT", "POST"]);
   next();
});

// No further processing needed for options calls.
app.options("/*", function(req, res) {
   res.status(200).end();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

app.get('/api/hello', (req, res) => {
   res.send({
      messages: messages
   });
});

app.post('/api/speak', (req, res) => {
   console.log(req.body.message);
   messages.push(req.body.message);
   var params = {
      text: req.body.message,
      voice: 'en-US_AllisonVoice', // Optional voice
      accept: 'audio/wav'
   };

   // Synthesize speech, correct the wav header, then save to disk
   // (wav header requires a file length, but this is unknown until after the header is already generated and sent)
   textToSpeech
      .synthesize(params, function (err, audio) {
         if (err) {
            console.log(err);
            return;
         }
         textToSpeech.repairWavHeader(audio);
         fs.writeFileSync('audio.wav', audio);
         console.log('audio.wav written with a corrected wav header');
         player.play('./audio.wav', (err) => {
            if (err) console.log(err);
         });
      });
});

// Soundboard post requests

app.post('/api/airhorn', (req, res) => {
   player.play('./airhorn.mp3', (err) => {
      if (err) console.log(err);
   });
});

app.listen(port, () => console.log(`Listening on port ${port}`));