import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import BloodyService from "../../services/bloody-service";

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "environment",
};

const WebCam = ({ id }) => {
  const webcamRef = useRef(null);
  const [playVideo, setPlayVideo] = useState(false);
  const [imgSrc, setImgSrc] = useState(null); // byte64
  console.log(id);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imageSrc);
  }, [webcamRef, setImgSrc]);

  const cancel = () => {
    let stream = webcamRef.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    // setImgSrc(null);
  };

  const startVideo = () => {
    setPlayVideo(true);
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let video = document.getElementsByClassName("app__videoFeed")[0];
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  };

  const stopVideo = () => {
    const params = {
      img: imgSrc,
    };
    BloodyService.recognize_image(params).then((res) => {
      console.log(res);
    });
    // setPlayVideo(false);
    // let video = document.getElementsByClassName("app__videoFeed")[0];
    // video.srcObject.getTracks()[0].stop();
  };

  return (
    <div
      id="takePicture"
      className="modal fade"
      data-bs-keyboard="false"
      data-bs-backdrop="static"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              拍照
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex justify-content-center">
            {imgSrc === null ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                // minScreenshotWidth={180}
                // minScreenshotHeight={180}
              />
            ) : (
              <>
                <img src={imgSrc} alt="img" />
                <button onClick={() => setImgSrc(null)}>Retake</button>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-target="#newBloodyBackdrop"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              onClick={stopVideo}
            >
              back Photo
            </button>
            <button className="btn btn-primary" onClick={capture}>
              Capture Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebCam;
