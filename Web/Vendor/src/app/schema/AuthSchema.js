import * as Yup from "yup";

const AuthSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is Required"),
  email: Yup.string().required("Email is Required"),
  mobile: Yup.string().required("Mobile is Required"),
  dob: Yup.string().required("DOB is Required"),
  gender: Yup.string().required("Gender is Required"),
  password: Yup.string().required("Password is Required"),
  confirmPassword: Yup.string().required("Password is Required"),
  account_name: Yup.string().required("Account Name is Required"),
  account_number: Yup.string().required("Account Number is Required"),
  ifsc_code: Yup.string().required("IFSC Code is Required"),
  legalName: Yup.string().required("Legal Name is Required"),
  address1: Yup.string().required("Address Line 1 is Required"),
  address2: Yup.string().required("Address Line 2 is Required"),
  city: Yup.string().required("City is Required"),
  district: Yup.string().required("District is Required"),
  state: Yup.string().required("State is Required"),
  pincode: Yup.string().required("Pincode is Required"),
  businessPan:Yup.string().required("Business PAN is Required"),
  aadhaar:Yup.string().required("Aadhaar is Required"),
  GSTN:Yup.string().required("GSTN is Required"),
});

export default AuthSchema;
