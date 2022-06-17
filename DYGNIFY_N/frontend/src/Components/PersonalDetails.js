import React from "react";
import { useFormik } from "formik";
import Input from "./Common/input";
import * as Yup from "yup";
import submitApi from "../api/submitApi";

export function PersonalDetails({ setUserId }) {
  const newregex = /^[6789]\d{9}$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    age: Yup.number().required().min(18).positive().label("Age"),
    mobileNumber: Yup.string()
      .matches(newregex, "Phone Number is invalid")
      .required("Please enter your mobile number")
      .label("Mobile Number"),
  });

  const handleSubmit = async (data) => {
    try {
      const result = await submitApi.submitPersonal(data);
      if (!result.ok) {
        alert("Unexpected Error! Please Try again.");
        console.log("ERROR", result);
      } else {
        setUserId(result.data);
        alert("Data Submitted Successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      mobileNumber: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      handleSubmit(values);
      setUserId(1);
    },
  });

  return (
    <div style={{ marginLeft: "3%", marginTop: "2%" }}>
      <h3>Personal Details </h3>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="name"
          label="Name"
          name="name"
          type="text"
          error={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <Input
          id="email"
          label="Email Address"
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        <Input
          id="age"
          label="Age"
          name="age"
          type="number"
          min="18"
          error={
            formik.touched.age && formik.errors.age ? formik.errors.age : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
        />
        <Input
          id="mobilenumber"
          label="Mobile Number"
          name="mobileNumber"
          type="text"
          error={
            formik.touched.mobileNumber && formik.errors.mobileNumber
              ? formik.errors.mobileNumber
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.mobileNumber}
        />
        <button //this.validate return null which is falsee
          className="btn btn-primary"
          type="submit"
          style={{ marginTop: 10 }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
