import { Formik, Form } from "formik";
import { validationSchemaAddQuestionCategory } from "../../../validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { TAddQuestionCategoryFieldType } from "../types";
import { useAddQuestionCategoryMutation } from "../../../redux/services/myQuestionCategoryApiEndpoints";
import { useEffect } from "react";
import { categoryInitialValues } from "../../../configs/constants";
import { FaHome } from "react-icons/fa";
import {
  BreadCrumb,
  FormikButton,
  FormikInputField,
} from "../../../components";
const AddQuestionCategory = () => {
  const navigate = useNavigate();

  const [addQuestionCategory, { error, isSuccess }] =
    useAddQuestionCategoryMutation();

  const onSubmit = async (values: TAddQuestionCategoryFieldType) => {
    try {
      await addQuestionCategory(values);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Category added!");
      navigate("/admin/questioncategory");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error.data.message);
    }
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      className="w-full pt-5 pb-10 px-8 "
    >
      <div className="flex flex-col justify-start items-left p-2 mb-2">
        <BreadCrumb
          icon={FaHome}
          title="Question Category"
          subTitle="New Category"
          backToPage="/admin/questioncategory"
        />
        <h1 className="text-primary font-medium text-2xl">New Category</h1>
      </div>

      <Formik
        initialValues={categoryInitialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchemaAddQuestionCategory}
      >
        {({ handleChange }) => (
          <Form>
            <div className="border-2  p-7 rounded-md grid gap-2 gap-x-6 grid-cols-2 border-primary-light ">
              <FormikInputField
                name="title"
                label="Title"
                type="text"
                handleChange={handleChange}
              />
              <FormikInputField
                name="slug"
                label="Slug"
                type="text"
                handleChange={handleChange}
              />
            </div>

            <FormikButton type="submit" label="Add" />
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default AddQuestionCategory;
