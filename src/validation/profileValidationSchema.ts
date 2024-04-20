import * as Yup from "yup";

const profileValidationSchema = Yup.object({
  education: Yup.string().required("Education is required"),
  career: Yup.string().required("Career is required"),
  experience: Yup.string().required("Experience is required"),
  skills: Yup.string().required("Skills is required"),
});

export default profileValidationSchema;
