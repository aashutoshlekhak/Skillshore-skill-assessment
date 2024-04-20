import * as Yup from "yup";

const validationSchemaAddQuestion = Yup.object({
  title: Yup.string()
    .matches(/^\s*\S+/, "Title is required")
    .required("Title is required")
    .max(255),
  slug: Yup.string()
    .required("Slug is required")
    .max(255)
    .matches(
      /^\s*[a-z0-9]+(?:-[a-z0-9]+)*\s*$/,
      "Slug should be words seperated by '-'"
    ),
  description: Yup.string()
    .matches(/^\s*\S+/, "Description is required")
    .max(5000)
    .required("Description is required"),
  options: Yup.array().of(
    Yup.string()
      .matches(/^\s*\S+/, "Option is required")
      .required("Option is required")
  ),
  answer: Yup.string().required("Answer is required"),
  weightage: Yup.string()
    .notOneOf(["0"], "Weightage is required")
    .required("Weightage is required"),
  category_id: Yup.number()
    .required("Category is required")
    .positive("Category is required"),
  status: Yup.boolean().required("Status is required"),
});
export default validationSchemaAddQuestion;
