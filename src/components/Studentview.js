import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

function Studentview() {
  let { studentId } = useParams();
  const [searchParams, setSearchparams] = useSearchParams();
  let [viewdata, setViewdata] = useState([]);

  async function getData() {
    try {
      let data = await fetch(
        `https://628f2b780e69410599d693ab.mockapi.io/students/${studentId}`
      );
      let student = await data.json();
      console.log(student);
      setViewdata(student);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
    <h2>Students view</h2>
    <div className='box' style={{background:"white",paddingLeft:"30px",paddingTop:"20px",paddingBottom:"20px",width:"50%",boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",marginLeft:"250px",borderRadius:"20px",marginTop:"70px"}} >
       <h3>Name : {viewdata.name}</h3>
      <h3>Email : {viewdata.email}</h3>
      <h3>Age :   {viewdata.age}</h3>
      <h3>Batch : {viewdata.batch}</h3>
      <h3>Teacher : {viewdata.teacher}</h3>
    </div>
    </div>
  )
}

export default Studentview