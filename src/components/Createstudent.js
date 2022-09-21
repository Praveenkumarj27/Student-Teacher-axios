import React, { useEffect } from "react";
import Select from "react-select";
import { Field, Form, useFormik } from "formik";
import "../App.css";
import { useNavigate, useRoutes } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Createstudent() {
  let navigation = useNavigate();
  let [isloading, setloading] = useState();
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


  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      batch: "",
      teacher: "",
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
      if (!values.age) {
        errors.age = "please enter age";
      }
      if (!values.batch) {
        errors.batch = "please enter batch";
      }
      if (!values.teacher) {
        errors.batch = "please enter teacher";
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        setloading(true);
        console.log(values);
        await axios.post(
          "https://628f2b780e69410599d693ab.mockapi.io/students",
          values
        );
        navigation("/students");
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
          <div className="col-lg-6">
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
          </div>
          <div className="col-lg-6">
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
          </div>



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
  );
}

export default Createstudent;
