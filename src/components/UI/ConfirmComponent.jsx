import React from "react";
import AuthService from "../../services/auth-service";

const ConfirmComponent = ({ id }) => {
  const cancelLineHandler = async () => {
    const user = JSON.parse(localStorage.getItem("user")).user;
    AuthService.updateUser(user, "lineNotify").then(({ data }) => {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.reload();
    });
  };

  return (
    <div
      id={id}
      className="modal fade"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">提示訊息</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>確定要取消Line Notify連結嗎?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              onClick={cancelLineHandler}
              className="btn btn-primary"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmComponent;
