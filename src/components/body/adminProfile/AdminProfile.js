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
  const [searchTerm, setSearchTerm]= useState("")
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
    <section className="content" id="adminProfile">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <h2 className="subtitle h3">All Students</h2>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-9">
            <div className="row mb-3">
              <div className="search col">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Type to search"
                    aria-label="Search students"
                    aria-describedby="button-addon2" onChange={(event) => {setSearchTerm(event.target.value)}}
                  />
                </div>
              </div>
              <div className="addStudent col">
                <button className="btn btn-success mx-1">Add Student</button>
                <button className="btn btn-success mx-1">
                  Generate Report
                </button>
                <button className="btn btn-success mx-1">
                  View Statistics
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
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
                    {students.accounts.filter((student) =>{
                      if(searchTerm == "") {
                        return student
                      } else if(student.firstName.toLowerCase().includes(searchTerm.toLowerCase()
                        )){
                          return student
                        }
                        else if(student.lastName.toLowerCase().includes(searchTerm.toLowerCase()
                        )){
                          return student
                        }
                        else if (student.email.toLowerCase().includes(searchTerm.toLowerCase()
                        )){
                          return student
                        }else if (student.nic.toLowerCase().includes(searchTerm.toLowerCase()
                        )){
                          return student
                        }
                    }).map((student) => (
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
      </div>
    </section>
  );
}

export default AdminProfile;
