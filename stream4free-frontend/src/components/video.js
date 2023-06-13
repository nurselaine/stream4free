import React, { useRef } from "react";

const data = [];
let video;

export default function Video() {
  // define video ref
  const videoRef = useRef();

  const startshare = async () => {
    if (navigator.mediaDevices.getDisplayMedia) {
      video = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: {
          cursor: "always",
        },
      });
      const video_recording = new MediaRecorder(video);
      video_recording.ondataavailable = (clip) => {
        console.log(clip.data);
        data.push(clip.data);
      };

      video_recording.start(1000);

      video_recording.onstop = (c) => {
        console.log("stop event", c);
        const video_src = URL.createObjectURL(
          new Blob(data, { type: "video/mp4" })
        );
        alert(video_src);
        videoRef.current.src = video_src;
      };
      console.log("video recording", video_recording);
      videoRef.current.srcObject = video;
    }
  };

  return (
    <>
      <div>
        <button onClick={() => {
          startshare()
        }}>start</button>
        <button onClick={() =>{
          let tracks = videoRef.current.srcObject.getTracks();
          tracks.forEach((t) => t.stop())
          videoRef.current.srcObject = null;
          console.log('tracks', tracks);
        }}>stop</button>
      </div>
      <video
        style={{ width: 800, height: 800 }}
        ref={videoRef}
        autoPlay
        controls
      />
    </>
  );
}
