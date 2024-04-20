import { Formik, Form } from "formik";
import { validationSchemaAddQuestionCategory } from "../../../validation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { TAddQuestionCategoryFieldType } from "../types";
import {
  useEditQuestionCategoryMutation,
  useGetSingleQuestionCategoryQuery,
} from "../../../redux/services/myQuestionCategoryApiEndpoints";
import { useEffect } from "react";
import { ParamsType } from "../types/TCommonTypes";
import { useLoadingState } from "../../../layouts/AdminLayout";
import { FaHome } from "react-icons/fa";
import {
  BreadCrumb,
  FormikButton,
  FormikInputField,
} from "../../../components";

const EditQuestionCategory = () => {
  const navigate = useNavigate();

  const loadingState = useLoadingState();
  const { setShowLoader } = loadingState;

  const params = useParams();
  const { id } = params as ParamsType;

  const { data, isLoading } = useGetSingleQuestionCategoryQuery(id);

  const [editQuestionCategory, { error, isSuccess }] =
    useEditQuestionCategoryMutation();

  const onSubmit = async (values: TAddQuestionCategoryFieldType) => {
    const editedValues = { ...values, id: id };
    try {
      await editQuestionCategory(editedValues);
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
      navigate("/admin/questioncategory");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error.data.message);
    }
  }, [error]);

  if (!data) return;
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
          subTitle="Edit Category"
          backToPage="/admin/questioncategory"
        />

        <h1 className="text-primary font-medium text-2xl">Edit Category</h1>
      </div>

      <Formik
        initialValues={data}
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

            <FormikButton type="submit" label="Save" />
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default EditQuestionCategory;
