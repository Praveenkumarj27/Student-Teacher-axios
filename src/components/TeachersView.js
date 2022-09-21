import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

function TeachersView() {
  let { teacherId } = useParams();
  const [searchParams, setSearchparams] = useSearchParams();
  let [viewdata, setViewdata] = useState([]);

  async function getData() {
    try {
      let data = await fetch(
        `https://628f2b780e69410599d693ab.mockapi.io/teachers/${teacherId}`
      );
      let student = await data.json();
      setViewdata(student);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <h2>TeachersView</h2>
      <div className='box' style={{background:"white",paddingLeft:"30px",paddingTop:"20px",paddingBottom:"20px",width:"50%",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",marginLeft:"250px",borderRadius:"20px",marginTop:"70px"}} >
       <h3>Name : {viewdata.name}</h3>
      <h3>Email : {viewdata.email}</h3>
      
     
    </div>
    </>
  )
}

export default TeachersView