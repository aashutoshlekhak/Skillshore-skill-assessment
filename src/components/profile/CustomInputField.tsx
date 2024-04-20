import { ErrorMessage, Field } from "formik";
import { FC } from "react";

interface Props {
  name: string;
  title: string;
  fieldId: string;
}

const CustomInputField: FC<Props> = ({ name, title, fieldId }) => {
  return (
    <div className="flex flex-row gap-[20px]  mb-2">
      <div className="flex flex-col text-[18px] mb-4 w-full">
        <label htmlFor={name} className="mb-2 text-dark text-base font-normal">
          {title}
        </label>
        <Field
          type="text"
          id={fieldId}
          name={name}
          className="w-full text-[16px] h-12 bg-white rounded-lg border-2 border-indigo-100 px-3"
        />
        <ErrorMessage
          className="text-[13px] text-error mt-1"
          name={name}
          component="div"
        />
      </div>
    </div>
  );
};

export default CustomInputField;
