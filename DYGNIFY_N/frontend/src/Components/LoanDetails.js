import React from "react";
import { useFormik } from "formik";
import Input from "./Common/input";
import * as Yup from "yup";
import submitApi from "../api/submitApi";

export function LoanDetails({ userId }) {
  const validationSchema = Yup.object().shape({
    loanAmount: Yup.number()
      .required("Required")
      .min(5000)
      .positive()
      .label("Loan Amount"),
    loanTenure: Yup.number()
      .required("")
      .positive()
      .min(1)
      .label("Loan Tenure"),
  });

  const formik = useFormik({
    initialValues: {
      loanAmount: 0,
      loanTenure: 0,
      interestRate: "14 % p.a.",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      //alert(JSON.stringify(values, null, 2));

      if (!userId) {
        alert("Submit Your Personal Details First.");
        resetForm();
      } else handleSubmit({ ...values, id: userId });
    },
  });

  const handleSubmit = async (data) => {
    try {
      const result = await submitApi.submitLoan(data);
      if (!result.ok) {
        console.log("ERROR", result);
        alert("Unexpected Error! Please Try again.");
      } else alert("Data Submitted Successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  let r = 14 / (12 * 100);

  return (
    <div style={{ marginLeft: "3%", marginTop: "2%" }}>
      <h3>Loan Details </h3>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="loanAmount"
          label="Loan Amount"
          name="loanAmount"
          type="number"
          min={5000}
          error={
            formik.touched.age && formik.errors.age ? formik.errors.age : null
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.loanAmount}
        />
        <div className="d-flex flex-row" style={{ alignItems: "flex-end" }}>
          <Input
            id="loanTenure"
            label="Loan Tenure"
            name="loanTenure"
            min={1}
            style={{ width: "90%", marginRight: "-100px" }}
            type="number"
            error={
              formik.touched.loanTenure && formik.errors.loanTenure
                ? formik.errors.loanTenure
                : null
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.loanTenure}
          />
          <h6>Months</h6>
        </div>
        <Input
          id="interestRate"
          label="Interest Rate"
          name="interestRate"
          type="text"
          value={formik.values.interestRate}
        />

        <h5 style={{ marginTop: "30px" }}>
          EMI = {"\u20B9"}
          {formik.values.loanAmount && formik.values.loanTenure
            ? Math.floor(
                formik.values.loanAmount *
                  r *
                  ((1 + r) ** formik.values.loanTenure /
                    ((1 + r) ** formik.values.loanTenure - 1))
              )
            : 0}
        </h5>
        <button className="btn btn-primary" style={{ marginTop: 10 }}>
          Submit
        </button>
      </form>
    </div>
  );
}
