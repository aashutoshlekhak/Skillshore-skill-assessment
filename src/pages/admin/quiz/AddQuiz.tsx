import { Formik, Form } from "formik";
import { validationSchemaAddQuiz } from "../../../validation";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { TAddQuizFieldType } from "../types";
import { useAddQuizMutation } from "../../../redux/services/myQuizApiEndpoints";
import { AddQuizInitialValues } from "../../../configs/constants";
import { FaHome } from "react-icons/fa";
import {
  BreadCrumb,
  FormikButton,
  FormikFileInputField,
  FormikInputField,
  FormikSelectCategoryField,
  FormikSelectQuestionCategoriesField,
  FormikSelectStatus,
  FormikTextAreaField,
  ThumbnailPreview,
} from "../../../components";
import { useGetAllQuizCategoriesQuery } from "../../../redux/services/myQuizCategoryApiEndpoints";
import { useLoadingState } from "../../../layouts/AdminLayout";

const AddQuiz = () => {
  const navigate = useNavigate();
  const { setShowLoader } = useLoadingState();

  const [thumbnail, setThumbnail] = useState<File | string>("");
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const [addQuiz, { error, isSuccess }] = useAddQuizMutation();
  const { data: quizCategoryList, isLoading } = useGetAllQuizCategoriesQuery();

  const onSubmit = async (values: TAddQuizFieldType) => {
    const valuesToSend = {
      ...values,
      thumbnail: thumbnail,
      category_id: Number(values.category_id),
    };

    try {
      await addQuiz(valuesToSend);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Quiz added!");
      navigate("/admin/quiz");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error.data.message);
    }
  }, [error]);

  useEffect(() => {
    setShowLoader(isLoading);
  }, [isLoading]);

  if (!quizCategoryList) return;

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      className="w-full pt-5 pb-10 px-8 "
    >
      <div className="flex flex-col justify-start items-left p-2 mb-2">
        <BreadCrumb
          icon={FaHome}
          title="Quiz"
          subTitle="New Quiz"
          backToPage="/admin/quiz"
        />
        <h1 className="text-primary font-medium text-2xl">New Quiz</h1>
      </div>

      <Formik
        initialValues={AddQuizInitialValues}
        onSubmit={onSubmit}
        validateOnBlur={true}
        validationSchema={validationSchemaAddQuiz}
      >
        {({ handleChange, handleBlur, setFieldValue, values }) => (
          <Form>
            <div className="border-2  p-7 rounded-md grid gap-2 gap-x-6 grid-cols-2 border-primary-light ">
              <FormikFileInputField
                name="thumbnail"
                label="Thumbnail"
                setThumbnail={setThumbnail}
                handleChange={handleChange}
                setPreview={setPreview}
                thumbnail={thumbnail}
                setFieldValue={setFieldValue}
                values={values}
              />

              <div className="flex w-full justify-end">
                {values.thumbnail && preview ? (
                  <ThumbnailPreview image={preview.toString()} />
                ) : null}
              </div>

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

              <FormikSelectCategoryField
                label="Quiz Category"
                data={quizCategoryList}
              />

              <FormikSelectQuestionCategoriesField
                setFieldValue={setFieldValue}
                handleBlur={handleBlur}
              />

              <FormikTextAreaField name="description" label="Description" />

              <FormikInputField
                name="time"
                label="Time"
                subLabel="minute"
                type="number"
                handleChange={handleChange}
              />

              <FormikSelectStatus />

              <FormikInputField
                name="retry_after"
                label="Retry After"
                subLabel="day"
                type="number"
                handleChange={handleChange}
              />

              <FormikInputField
                name="pass_percentage"
                label="Pass Percentage"
                type="number"
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

export default AddQuiz;
