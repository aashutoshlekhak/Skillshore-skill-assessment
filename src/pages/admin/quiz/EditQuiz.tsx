import { Formik, Form } from "formik";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { TAddQuizFieldType } from "../types";
import {
  useEditQuizMutation,
  useGetSingleQuizQuery,
} from "../../../redux/services/myQuizApiEndpoints";
import { ParamsType } from "../types/TCommonTypes";
import { useLoadingState } from "../../../layouts/AdminLayout";

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
import { validationSchemaEditQuiz } from "../../../validation";

type TValuesToMap = {
  id: number;
  thumbnail?: string | File;
  category_id: number;
  title: string;
  slug: string;
  description: string;
  time: string | number;
  retry_after: string | number;
  question_categories: number[];
  status: number;
  pass_percentage: string | number;
};

const EditQuiz = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { id } = params as ParamsType;

  const loadingState = useLoadingState();
  const { setShowLoader } = loadingState;

  const { data: quiz, isLoading: quizIsLoading } = useGetSingleQuizQuery(id);

  const { data: quizCategoryList } = useGetAllQuizCategoriesQuery();

  const [editQuiz, { isSuccess, error }] = useEditQuizMutation();

  const [thumbnail, setThumbnail] = useState<File | string>("");
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onSubmit = async (values: TAddQuizFieldType) => {
    const valuesToMap: TValuesToMap = {
      ...values,
      id: Number(id),
      thumbnail: thumbnail,
      category_id: Number(values.category_id),
    };

    if ("thumbnail" in valuesToMap && valuesToMap.thumbnail === "") {
      delete valuesToMap["thumbnail"];
    }

    const {
      category,
      thumbnail_url,
      question_categories_obj,
      ...valuesToSend
    } = valuesToMap as any;

    try {
      await editQuiz(valuesToSend);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setShowLoader(quizIsLoading);
  }, [quizIsLoading]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated!");
      navigate("/admin/quiz");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error.data.message);
    }
  }, [error]);

  if (!quiz || !quizCategoryList) return;

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
          subTitle="Edit Quiz"
          backToPage="/admin/quiz"
        />
        <h1 className="text-primary font-medium text-2xl">Edit Quiz</h1>
      </div>

      <Formik
        initialValues={quiz}
        onSubmit={onSubmit}
        validationSchema={validationSchemaEditQuiz}
      >
        {({ handleChange, setFieldValue, handleBlur, values }) => (
          <Form>
            <div className="border-2  p-7 rounded-md grid gap-2 gap-x-6 grid-cols-2 border-primary-light ">
              <FormikFileInputField
                name="thumbnail"
                label="Change Thumbnail"
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
                ) : (
                  <ThumbnailPreview image={quiz.thumbnail_url} />
                )}
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
                selected={quiz.question_categories_obj}
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

            <FormikButton type="submit" label="Save" />
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default EditQuiz;
