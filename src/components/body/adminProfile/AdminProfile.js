import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  fetchAllStudents,
  dispatchGetAllStudents,
} from "../../../redux/actions/studentsAction";

function AdminProfile() {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    password2: "",
    gender: "",
    err: "",
    success: "",
  };

  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const students = useSelector((state) => state.students);

  const { student, isLogged } = auth;
  const history = useHistory();
  const [data, setData] = useState(initialState);
  const [thumbnail, setThumbnail] = useState(false);
  const {
    firstName,
    lastName,
    email,
    address,
    phone,
    password,
    password2,
    gender,
    err,
    success,
  } = data;
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    return fetchAllStudents(token).then((res) => {
      dispatch(dispatchGetAllStudents(res));
    });
  }, [token, dispatch, callback]);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this account?")) {
        setLoading(true);
        await axios.delete(`/admin/delete/${id}`, {
          headers: { Authorization: token },
        });
        setLoading(false);
        setCallback(!callback);
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="div">
      <div className="row">
        <div className="col">
          <h2 className="subtitle h3">All Students</h2>
        </div>
      </div>
      <div className="row">
        <div className="col mt-3 table-wrap">
          <div className="table-responsive">
            <table
              id="adminProfile"
              className="table table-hover table-bordered table-sm align-middle"
            >
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>NIC</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.email}</td>
                    <td>{student.nic}</td>
                    <td>{student.address}</td>
                    <td>{student.phone}</td>
                    <td>{student.gender}</td>
                    <td>
                      <button
                        className="deleteBtn"
                        onClick={() => handleDelete(student._id)}
                      >
                        <i class="fas fa-trash"></i>&nbsp;&nbsp;Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
