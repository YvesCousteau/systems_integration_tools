import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import * as io from "socket.io-client";

function App() {
  const [cam, setCam] = useState(false)
  const localVideoRef = useRef<any>(null);
  const localAudioRef = useRef<any>(null);

  const params = useParams();

  let pc:any; // For RTCPeerConnection Object

  function negotiate() {
    console.log("negotiate");
    pc.addTransceiver('video', {direction: 'recvonly'});
    pc.addTransceiver('audio', {direction: 'recvonly'});
    return pc.createOffer().then(function(offer:any) {
      return pc.setLocalDescription(offer);
    }).then(function() {
      // wait for ICE gathering to complete
      return new Promise(function(resolve) {
        if (pc.iceGatheringState === 'complete') { resolve(null); } 
        else {
          const check = function checkState() {
            if (pc.iceGatheringState === 'complete') {
              pc.removeEventListener('icegatheringstatechange', checkState);
              resolve(null);
            }
          }
          pc.addEventListener('icegatheringstatechange', check);
        }
      });
    }).then(function() {
      var offer = pc.localDescription;
      return fetch('/offer', {
        body: JSON.stringify({
          sdp: offer.sdp,
          type: offer.type,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
    }).then(function(response:any) {
      return response.json();
    }).then(function(answer:any) {
      return pc.setRemoteDescription(answer);
    }).catch(function(e:any) {
      alert(e);
    });
  }

  function start() {
    console.log("start");
    var config :any = { sdpSemantics: 'unified-plan' };
    pc = new RTCPeerConnection(config);
    // connect audio / video
    pc.addEventListener('track', function(evt:any) {
      if (evt.track.kind == 'video') {
        if (localVideoRef.current) localVideoRef.current.srcObject = evt.streams[0];
      } else {
        if (localAudioRef.current) localAudioRef.current.srcObject = evt.streams[0];
      }
    });
    negotiate();
  }

  useEffect(() => {
    if (!cam) {
      setCam(true);
    }
    if (cam) {
      start();
    }
  },[cam]);

  return (
    <div className="min-w-screen min-h-screen grid grid-cols-1 content-center">
        <video autoPlay muted playsInline ref={localVideoRef} className="h-screen  mx-auto" />
    </div>
  );
}



export default App;