import * as Yup from "yup";

const validationSchemaEditQuiz = Yup.object({
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
  category_id: Yup.number()
    .required("Category is required")
    .positive("Category is required"),
  thumbnail: Yup.mixed(),
  description: Yup.string()
    .max(5000)
    .matches(/^\s*\S+/, "Description is required")
    .required("Description is required"),
  time: Yup.number()
    .integer("Must be a whole number")
    .required("Time is required and must be a number")
    .notOneOf([0], "Input should not be zero")
    .positive("Must be positive"),
  retry_after: Yup.number()
    .integer("Must be a whole number")
    .notOneOf([0], "Input should not be zero")
    .required("Retry after is required and must be a number")
    .positive("Must be positive"),
  question_categories: Yup.array()
    .of(Yup.number().required("Question Categories are required"))
    .min(1, "Question Categories are required")
    .required("Question Categories are required"),
  status: Yup.boolean().required("Status is required"),
  pass_percentage: Yup.number()
    .integer("Must be a whole number")
    .notOneOf([0], "Input should not be zero")
    .required("Pass percentage is required and must be a number")
    .max(99, "Must be less that 100")
    .positive("Must be positive"),
});
export default validationSchemaEditQuiz;
