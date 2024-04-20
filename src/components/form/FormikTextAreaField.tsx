import { ErrorMessage, Field } from "formik";

type Props = {
  name: string;
  label: string;
};

const FormikTextAreaField = ({ name, label }: Props) => {
  return (
    <div className="flex flex-col gap-1 col-span-2 h-[228px]">
      <div className="flex  flex-col gap-2">
        <label htmlFor={name} className="text-base text-dark">
          {label}
        </label>
        <Field
          as="textarea"
          id={name}
          autoComplete={`current-${name}`}
          name={name}
          className="p-1 px-2 text-sm h-44 rounded-md border-2 border-primary-light hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-primary w-full"
        />
      </div>
      <ErrorMessage
        className="text-red-500 text-xs"
        component="div"
        name={name}
      />
    </div>
  );
};

export default FormikTextAreaField;
