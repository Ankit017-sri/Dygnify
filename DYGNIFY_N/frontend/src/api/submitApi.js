import client from "./client";

const submitPersonal = (data) => client.post("/details/post", data);

const submitBusiness = (data) => client.put("/details/update", data);

const submitLoan = (data) => client.put("/details/update", data);

export default {
  submitPersonal,
  submitBusiness,
  submitLoan,
};
