import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Teachers() {
  const[Teachers,setTeachers]=useState([])
  //On Mount
  useEffect(() => {
    fetchData()
  }, []);

  let fetchData = async () => {
    let teachersData=await axios.get("https://628f2b780e69410599d693ab.mockapi.io/teachers");
    console.log(teachersData);
    setTeachers(teachersData.data)
  }

  let handleDelete=async(id)=>{
    let ask=window.confirm("Do you want to delete")
    if(ask){
      await axios.delete(`https://628f2b780e69410599d693ab.mockapi.io/teachers/${id}`)
      fetchData()
    }
  }

   
  return (
    <>
      <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
          <Link
            to="/teachers/create"
            class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i class="fas fa-download fa-sm text-white-50"></i> + Create Teacher
          </Link>
        </div>
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">
              Teachers List
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
                    
                    <th>Action</th>
                  </tr>
                </thead>
                
                <tbody>
                  {Teachers.map((teacher) => {
                    return (
                      <tr>
                        <td>{teacher.name}</td>
                        <td>{teacher.email}</td>
                       
                        <td>
                          <Link to={`/teachers/view/${teacher.id}`} className="btn btn-sm btn-warning mr-2">View</Link>
                          <Link to={`/teachers/edit/${teacher.id}`} className="btn btn-sm btn-info mr-2">Edit</Link>
                          <button onClick={()=>handleDelete(teacher.id)} className="btn btn-sm btn-danger mr-2">Delete</button>
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

export default Teachers;
