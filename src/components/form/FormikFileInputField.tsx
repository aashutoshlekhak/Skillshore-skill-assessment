import { ErrorMessage, Field } from "formik";
import { FormEvent, useEffect } from "react";
import { ImCross } from "react-icons/im";
type Props = {
  thumbnail?: any;
  name: string;
  label: string;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  setThumbnail: React.Dispatch<React.SetStateAction<string | File>>;
  resetBtn?: boolean;
  setPreview: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
  setFieldValue?: any;
  values?: any;
};

const FormikFileInputField = ({
  name,
  handleChange,
  setThumbnail,
  setPreview,
  thumbnail,
  setFieldValue,
  values,
  label,
}: Props) => {
  useEffect(() => {
    if (values.thumbnail === "") {
      setFieldValue("thumbnail", "");
    }
  }, [values]);

  return (
    <div className="h-[88px]">
      <div className="relative flex flex-col gap-2  ">
        <label htmlFor={name} className=" text-base text-dark ">
          {label}
        </label>
        <Field
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          id={name}
          autoComplete={`current-${name}`}
          name={name}
          onClick={(e: FormEvent<HTMLInputElement>) => {
            if (thumbnail) {
              e.preventDefault();
            }
          }}
          onChange={(event: FormEvent<HTMLInputElement>) => {
            handleChange(event);
            if (event.currentTarget.files === null) return;
            const file = event.currentTarget.files[0];

            if (file) {
              setThumbnail(file);
              const fileReader = new FileReader();
              fileReader.onload = function () {
                setPreview(fileReader.result);
              };
              fileReader.readAsDataURL(file);
            }
          }}
          className=" text-sm rounded-md border-2 border-primary-light hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-primary w-full"
        />
        {values.thumbnail !== "" && (
          <ImCross
            className="absolute top-[42px] right-[10px] bg-[#eeeeeec8] rounded-md p-[6px] text-[#ec6161] text-2xl cursor-pointer hover:bg-[#ec616137]"
            onClick={() => {
              setThumbnail("");
              setFieldValue("thumbnail", "");
            }}
          />
        )}
      </div>
      <ErrorMessage
        className="text-red-500 text-xs "
        component="div"
        name={name}
      />
    </div>
  );
};

export default FormikFileInputField;
