import { useFormik,} from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
function Studentedit() {
    let params=useParams();
    let [teachers, setTeachers] = useState();
    let getData = async () => {
      let teachersData = await axios.get(
        "https://628f2b780e69410599d693ab.mockapi.io/teachers"
      );
      setTeachers(teachersData.data);
      console.log(teachersData);
    };
  
    useEffect(() => {
      getData();
    }, []);

    let navigate=useNavigate();
    const formik=useFormik({
        initialValues: {
          name: "",
          email:"",
          age: "",
          batch: "",
          teacher:""
        },
        validate: (values) => {
          let errors = {};
          let pattern = new RegExp(/^[a-zA-Z\-]+$/);
          if (!values.name) {
            errors.name = "Please enter the name";
          } else if (values.name.length < 5) {
            errors.name = "Length should be more than 5";
          } else if (values.name.length > 25) {
            errors.name = "Length should be less than 25";
          }
          //  else if (!pattern.test(formik.values.name)) {
          //   errors.name = "Studentname should not have numbers";
          // }
          if (!values.email) {
            errors.email = "please enter email";
          }
          if (!values.age) {
            errors.age = "please enter age";
          }
          if (!values.batch) {
            errors.batch = "please enter batch";
          }
    
          return errors;
        },
        onSubmit: async (values) => {
            try {
              await axios.put(`https://628f2b780e69410599d693ab.mockapi.io/students/${params.studentId}`,values)
              navigate("/students");
            } catch (error) {}
          },
    });
   
    useEffect(() => {
        let fetchData = async () => {
          let studentData=await axios.get(`https://628f2b780e69410599d693ab.mockapi.io/students/${params.studentId}`);
          console.log(studentData);
        //   setStudents(studnetData.data)
        formik.setValues(studentData.data)
        }
        fetchData()
      }, []);

     

    
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6 mt-2">
            <label>Name</label>
            <input
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              type="text"
              className={`form-control ${
                formik.errors.name ? "error-border" : ""
              }`}
            />
            {/* {
                            formik.errors.name?<span className="color1">{formik.errors.name}</span>:null
                        } */}
          </div>
          <div className="col-lg-6 mt-2">
            <label>Email</label>
            <input
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              type="text"
              className={`form-control ${
                formik.errors.email ? "error-border" : ""
              }`}
            />
            {/* {
                            formik.errors.email?<span className="color1">{formik.errors.position}</span>:null
                        } */}
          </div>
          <div className="col-lg-6 mt-2">
            <label>Age</label>
            <input
              name="age"
              onChange={formik.handleChange}
              value={formik.values.age}
              type="text"
              className={`form-control ${
                formik.errors.age ? "error-border" : ""
              }`}
            />
            {/* {
                            formik.errors.age?<span className="color1">{formik.errors.age}</span>:null
                        } */}
          </div>
          <div className="col-lg-6 mt-2">
            <label>Batch</label>
            <input
              name="batch"
              onChange={formik.handleChange}
              value={formik.values.batch}
              type="text"
              className={`form-control ${
                formik.errors.batch ? "error-border" : ""
              }`}
            />
            {/* {
                            formik.errors.age?<span className="color1">{formik.errors.age}</span>:null
                        } */}
          </div>

          {/* <div className="col-lg-6 mt-2">
            <label>Teacher</label>
            <input
              name="teacher"
              onChange={formik.handleChange}
              value={formik.values.teacher}
              type="text"
              className={`form-control ${
                formik.errors.batch ? "error-border" : ""
              }`}
            />
           
          </div> */}

<div className="col-lg-6">
            <label >Teacher</label>
            <select
              className="form-control"
              name="teacher"
              value={formik.values.teacher}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {teachers?.map((option) => (
                <option value={option.name}>{option.name}</option>
              ))}
            </select>
          </div>
        
          <div className="col-lg-12">
            <input
              value="submit"
              type={"submit"}
              className="btn btn-primary mt-2"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Studentedit