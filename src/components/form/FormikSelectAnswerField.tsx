import { ErrorMessage, Field } from "formik";

type Props = {
  answerOptions: any;
};

const FormikSelectAnswerField = ({ answerOptions }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-2">
        <label htmlFor="answer" className="text-base text-dark">
          Answer
        </label>
        <Field
          as="select"
          id="answer"
          autoComplete="current-answer"
          name="answer"
          className="p-1 px-2 text-sm rounded-md border-2 border-primary-light hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-primary w-full"
        >
          <option value="" className="text-[#a0a0a0]">
            select answer...
          </option>
          {answerOptions}
        </Field>
      </div>
      <ErrorMessage
        className="text-red-500 text-xs"
        component="div"
        name="answer"
      />
    </div>
  );
};

export default FormikSelectAnswerField;
