import * as Yup from "yup";
const validationSchemaAddQuestionCategory = Yup.object({
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
});
export default validationSchemaAddQuestionCategory;
