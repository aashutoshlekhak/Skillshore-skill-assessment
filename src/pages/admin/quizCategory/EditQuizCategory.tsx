import { Formik, Form } from "formik";
import { validationSchemaAddQuizCategory } from "../../../validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { TAddQuizCategoryFieldType } from "../types";
import {
  useEditQuizCategoryMutation,
  useGetSingleQuizCategoryQuery,
} from "../../../redux/services/myQuizCategoryApiEndpoints";
import { useEffect } from "react";
import { useLoadingState } from "../../../layouts/AdminLayout";
import { FaHome } from "react-icons/fa";
import {
  BreadCrumb,
  FormikButton,
  FormikInputField,
} from "../../../components";
import { ParamsType } from "../types/TCommonTypes";

const EditQuizCategory = () => {
  const navigate = useNavigate();

  const params = useParams();

  const { id } = params as ParamsType;

  const { data: quizCategories, isLoading } = useGetSingleQuizCategoryQuery(id);

  const loadingState = useLoadingState();
  const { setShowLoader } = loadingState;

  const [editQuizCategory, { error, isSuccess }] =
    useEditQuizCategoryMutation();

  const onSubmit = async (values: TAddQuizCategoryFieldType) => {
    const editedValues = { ...values, id: id };
    try {
      await editQuizCategory(editedValues);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setShowLoader(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated!");
      navigate("/admin/quizCategory");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error.data.message);
    }
  }, [error]);

  if (!quizCategories) return;

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      className="w-full pt-5 pb-10 px-8 "
    >
      <div className="flex flex-col justify-start items-left p-2 mb-2">
        <BreadCrumb
          icon={FaHome}
          title="Quiz Category"
          subTitle="Edit Category"
          backToPage="/admin/quizCategory"
        />
        <h1 className="text-primary font-medium text-2xl">Edit Category</h1>
      </div>

      <Formik
        initialValues={quizCategories}
        onSubmit={onSubmit}
        validationSchema={validationSchemaAddQuizCategory}
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

            <FormikButton type="submit" label="Save" />
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default EditQuizCategory;
