import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Students() {
  const[Students,setStudents]=useState([])
  //On Mount
  useEffect(() => {
    fetchData()
  }, []);

  let fetchData = async () => {
    let studentData=await axios.get("https://628f2b780e69410599d693ab.mockapi.io/students");
    console.log(studentData);
    setStudents(studentData.data)
  }

  let handleDelete=async(id)=>{
    let ask=window.confirm("Do you want to delete")
    if(ask){
      await axios.delete(`https://628f2b780e69410599d693ab.mockapi.io/students/${id}`)
      fetchData()
    }
  }

   
  return (
    <>
      <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <Link
            to="/students/create"
            class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i class="fas fa-download fa-sm text-white-50"></i> + Create Student
          </Link>
        </div>
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              Student List
            </h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                class="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Batch</th>
                    <th>Teacher</th>
                    <th>Action</th>
                  </tr>
                </thead>
                
                <tbody>
                  {Students.map((student) => {
                    return (
                      <tr>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.age}</td>
                        <td>{student.batch}</td>
                        <td>{student.teacher}</td>
                        <td>
                          <Link to={`/students/view/${student.id}`} className="btn btn-sm btn-warning mr-2">View</Link>
                          <Link to={`/students/edit/${student.id}`} className="btn btn-sm btn-info mr-2">Edit</Link>
                          <button onClick={()=>handleDelete(student.id)} className="btn btn-sm btn-danger mr-2">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Students;
