import React, { useEffect, useRef } from 'react';

const JitsiMeet = ({ roomId, userName, onClose }) => {
  const jitsiContainerRef = useRef(null);
  const jitsiApi = useRef(null);

  useEffect(() => {
    if (window.JitsiMeetExternalAPI) {
      initJitsi();
    } else {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.onload = () => initJitsi();
      document.body.appendChild(script);
    }

    return () => {
      if (jitsiApi.current) {
        jitsiApi.current.dispose();
      }
    };
  }, [roomId, userName]);

  const initJitsi = () => {
    const options = {
      roomName: roomId,
      width: '100%',
      height: '100%',
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName: userName
      },
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        enableWelcomePage: false
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone',
          'camera',
          'closedcaptions',
          'desktop',
          'fullscreen',
          'fodeviceselection',
          'hangup',
          'chat',
          'settings',
          'raisehand',
          'videoquality',
          'filmstrip',
          'tileview'
        ]
      }
    };

    jitsiApi.current = new window.JitsiMeetExternalAPI('meet.jit.si', options);

    jitsiApi.current.addEventListener('readyToClose', () => {
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black animate-fade-in">
      <div ref={jitsiContainerRef} className="w-full h-full" />
    </div>
  );
};

export default JitsiMeet;
