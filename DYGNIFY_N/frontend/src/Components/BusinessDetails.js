import React from "react";
import { useFormik } from "formik";
import Input from "./Common/input";
import * as Yup from "yup";
import submitApi from "../api/submitApi";

export function BusinessDetails({ userId }) {
  //add regex for GST validation

  const validationSchema = Yup.object().shape({
    businessName: Yup.string().required().label("Business Name"),
    GSTNum: Yup.string().required().length(15).label("GSTIN"),
    address: Yup.string().required().max(100).label("Address"),
  });

  const formik = useFormik({
    initialValues: {
      businessName: "",
      GSTNum: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      if (!userId) {
        alert("Submit Your Personal Details First.");
        resetForm();
      } else handleSubmit({ ...values, id: userId });
    },
  });

  const handleSubmit = async (data) => {
    try {
      const result = await submitApi.submitBusiness(data);
      if (!result.ok) {
        alert("Unexpected Error! Please Try again.");
        console.log(result);
      } else alert("Data Submitted Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ marginLeft: "3%", marginTop: "2%" }}>
      <h3>Business Details </h3>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="businessName"
          label="Business Name"
          name="businessName"
          type="text"
          error={
            formik.touched.businessName && formik.errors.businessName
              ? formik.errors.businessName
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <Input
          id="gstNum"
          label="GST Number"
          name="GSTNum"
          type="text"
          error={
            formik.touched.GSTNum && formik.errors.GSTNum
              ? formik.errors.GSTNum
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.GSTNum}
        />
        <Input
          id="address"
          label="Address"
          name="address"
          type="text"
          error={
            formik.touched.address && formik.errors.address
              ? formik.errors.address
              : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        />

        <button //this.validate return null which is falsee
          className="btn btn-primary"
          style={{ marginTop: 10 }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
