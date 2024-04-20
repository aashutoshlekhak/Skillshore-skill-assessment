import { ErrorMessage, Field } from "formik";
import QuestionCategoriesCustomSelect from "./QuestionCategoriesCustomSelect";
import { useGetAllQuestionCategoriesQuery } from "../../redux/services/myQuestionCategoryApiEndpoints";

type Props = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  selected?: any;

  handleBlur: any;
};

const FormikSelectQuestionCategoriesField = ({
  setFieldValue,
  selected,

  handleBlur,
}: Props) => {
  const { data } = useGetAllQuestionCategoriesQuery();

  return (
    <div className=" h-[76px]">
      <div className=" flex flex-col gap-2  ">
        <label htmlFor="question_categories" className="text-base text-dark">
          Question Categories
        </label>

        <Field
          name="question_categories"
          component={QuestionCategoriesCustomSelect}
          options={data}
          setFieldValue={setFieldValue}
          selected={selected ? selected : null}
          handleBlur={handleBlur}
        />
      </div>
      <ErrorMessage
        className="text-red-500 text-xs "
        component="div"
        name="question_categories"
      />
    </div>
  );
};

export default FormikSelectQuestionCategoriesField;
