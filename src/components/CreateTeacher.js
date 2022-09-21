import React from "react";
import { useFormik } from "formik";
import "../App.css";
import { useNavigate, useRoutes } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function CreateTeacher() {
  let navigation = useNavigate();
  let [isloading, setloading] = useState();
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      students: "",
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
      } else if (!pattern.test(formik.values.name)) {
        errors.name = "Studentname should not have numbers";
      }
      if (!values.email) {
        errors.email = "please enter email";
      }
     

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setloading(true);
        console.log(values);
        await axios.post("https://628f2b780e69410599d693ab.mockapi.io/teachers",values)
        navigation("/teachers");
      } catch (error) {}
    },
  });
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
          {/* <div className="col-lg-6">
            <label>Age</label>
            <input
              name="age"
              onChange={formik.handleChange}
              value={formik.values.age}
              type="text"
              className={`form-control ${
                formik.errors.email ? "error-border" : ""
              }`}
            />
          </div> */}
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
  );
}

export default CreateTeacher;
