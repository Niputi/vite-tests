import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

import * as Video from 'twilio-video';
import type { RemoteParticipant, RemoteVideoTrack } from 'twilio-video';

Video.connect('$TOKEN', { name: 'room-name' }).then(room => {
  console.log('Connected to Room "%s"', room.name);

  room.participants.forEach(participantConnected);
  room.on('participantConnected', participantConnected);

  room.on('participantDisconnected', participantDisconnected);
  room.once('disconnected', error => room.participants.forEach(participantDisconnected));
});

function participantConnected(participant: RemoteParticipant) {
  console.log('Participant "%s" connected', participant.identity);

  const div = document.createElement('div');
  div.id = participant.sid;
  div.innerText = participant.identity;

  participant.on('trackSubscribed', track => trackSubscribed(div, track));
  participant.on('trackUnsubscribed', trackUnsubscribed);

  participant.tracks.forEach(publication => {
    if (publication.isSubscribed) {
      trackSubscribed(div, publication.track);
    }
  });

  document.body.appendChild(div);
}

function participantDisconnected(participant: RemoteParticipant) {
  console.log('Participant "%s" disconnected', participant.identity);
  document.getElementById(participant.sid)?.remove();
}

function trackSubscribed(div: HTMLDivElement, track: RemoteVideoTrack) {
  div.appendChild(track.attach());
}

function trackUnsubscribed(track: RemoteVideoTrack) {
  track.detach().forEach(element => element.remove());
}

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
