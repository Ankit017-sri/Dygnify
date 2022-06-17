// name email age mobile number
// businss name gst-number address
// loan amount, interest rate, loan tenure

const express = require("express");
const { Detail } = require("../models/detail");

const router = express.Router();

// router.get("/all", async (req, res) => {
//   const details = await Detail.find()

//   res.send(details);
// });

router.post("/post", async (req, res) => {
  try {
    const { name, email, age, mobileNumber } = req.body;

    const detail = new Detail({
      name,
      email,
      age,
      mobileNumber,
    });

    await detail.save();
    res.send(detail._id);
  } catch (error) {
    console.log(error);
  }
});

router.put("/update", async (req, res) => {
  try {
    const {
      businessName,
      gstNum,
      address,
      loanAmount,
      interestRate,
      loanTenure,
    } = req.body;

    const detail = await Detail.findByIdAndUpdate(req.body.id, {
      businessName,
      gstNum,
      address,
      loanAmount,
      interestRate,
      loanTenure,
    });

    if (!detail) res.status(404).send("user not found");

    res.send("Details added successfully");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
