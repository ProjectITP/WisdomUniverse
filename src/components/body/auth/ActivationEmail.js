import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../utils/notification/notification";

function ActivationEmail() {
  const { activation_token } = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/student/activation", {
            activation_token,
          });
          setSuccess(res.data.msg);
        } catch (err) {
          err.response.data.msg && setErr(err.response.data.msg);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  console.log(activation_token);
  return (
    <section class="content">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {err && showErrorMsg(err)}
            {success && showSuccessMsg(success)}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ActivationEmail;
