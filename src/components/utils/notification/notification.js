import React from "react";
import "./notification.css";

export const showErrorMsg = (msg) => {
  return (
    <div class="alert alert-danger" role="alert">
      <i class="fas fa-exclamation-circle"></i>&nbsp;&nbsp;{msg}
    </div>
  );
};
export const showSuccessMsg = (msg) => {
  return (
    <div className="alert alert-success" role="alert">
      <i class="fas fa-check-circle"></i>&nbsp;&nbsp;{msg}
    </div>
  );
};
