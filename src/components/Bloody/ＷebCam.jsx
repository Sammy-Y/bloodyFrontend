import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 120,
  height: 120,
  facingMode: "environment",
};

const WebCam = ({ id }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  console.log(id);
  const capture = useCallback(() => {
    console.log(webcamRef);
    console.log(imgSrc);
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const cancel = () => {
    let stream = webcamRef.current.stream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    setImgSrc(null);
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
      <div className="modal-dialog modal-dialog-centered">
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
            {/* {imgSrc && <img src={imgSrc} alt="img" />}
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              // minScreenshotWidth={180}
              // minScreenshotHeight={180}
            /> */}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-target="#newBloodyBackdrop"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
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
