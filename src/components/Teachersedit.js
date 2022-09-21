import { useFormik,} from 'formik'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
function Teachersedit() {
    let params=useParams();
    let navigate=useNavigate();
    const formik=useFormik({
        initialValues: {
          name: "",
          email:"",
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
    
          return errors;
        },
        onSubmit: async (values) => {
            try {
              await axios.put(`https://628f2b780e69410599d693ab.mockapi.io/teachers/${params.teacherId}`,values)
              navigate("/teachers");
            } catch (error) {}
          },
    });
   
    useEffect(() => {
        let fetchData = async () => {
          let teacherData=await axios.get(`https://628f2b780e69410599d693ab.mockapi.io/teachers/${params.teacherId}`);
          console.log(teacherData);
        formik.setValues(teacherData.data)
        }
        fetchData()
      }, []);

     

    
  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
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
            
          </div>
          <div className="col-lg-6">
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
            
          </div>
         
          
        
          <div className="col-lg-6">
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

export default Teachersedit