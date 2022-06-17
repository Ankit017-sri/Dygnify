const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    age: Number,
    mobileNumber: Number,
    businessName: String,
    gstNum: String,
    address: String,
    loanAmount: String,
    interestRate: String,
    loanTenure: String,
  },
  { timestamps: true }
);

const Detail = mongoose.model("Detail", detailSchema);

module.exports.detailSchema = detailSchema;
module.exports.Detail = Detail;
