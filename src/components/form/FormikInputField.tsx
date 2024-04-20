import { ErrorMessage, Field } from "formik";
import { ChangeEvent } from "react";
import { generateSlug } from "../../helpers";

type Props = {
  label: string;
  subLabel?: string;
  type: string;
  name: string;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
};

const FormikInputField = ({
  label,
  subLabel,
  type,
  name,
  handleChange,
}: Props) => {
  return (
    <div className="h-[76px]">
      <div className="flex flex-col gap-2">
        <label htmlFor={name} className="text-base text-dark">
          {label}
          {subLabel && (
            <span className="text-[11px] ml-1 opacity-60">{`(${subLabel})`}</span>
          )}
        </label>
        <Field
          type={type}
          id={name}
          autoComplete={`current-${name}`}
          name={name}
          className="p-1 px-2 text-sm rounded-md w-full  border-2 border-primary-light hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-primary"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e);

            if (name === "title") {
              const generatedSlug = generateSlug(e.target.value);
              handleChange({ target: { name: "slug", value: generatedSlug } });
            }
          }}
        />
      </div>
      <ErrorMessage
        className="text-red-500 text-xs "
        component="div"
        name={name}
      />
    </div>
  );
};

export default FormikInputField;
