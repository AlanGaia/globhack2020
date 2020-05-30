const Review = require('../models/Review');
const Company = require('../models/Company');

async function addReview(req, res) {
  const { companyName, summary, Q1, Q2, Q3, Q4, Q5 } = req.body;
  //Bad request
  if (!companyName) {
    return res.status(401).send("Company name missing");
  }
  const company = await Company.find({ name: companyName });

  if (company.length === 0) {
    //Add company to DB
    const newCompany = new Company({ name: companyName })
    await newCompany.save();

  }
  //Add average
  const average = calculateAverage(Q1, Q2, Q3, Q4, Q5)

  //200 OK
  const NewReview = new Review({ companyName, summary, Q1, Q2, Q3, Q4, Q5, average })
  await NewReview.save();

  return res.status(200).json({success: true, status: 200, message: "Review saved"});
}

function calculateAverage(num1, num2, num3, num4, num5) {
  let arr = [num1, num2, num3, num4, num5];
  
  let acum = arr.reduce((a,b) => Number(a)+ Number(b))
  const average = acum / arr.length;
  return average;
}

async function getReviewList(req, res) {
  const Reviews = await Review.find();
  return res.status(200).json(Reviews);
}

module.exports = {
  addReview,
  getReviewList
}