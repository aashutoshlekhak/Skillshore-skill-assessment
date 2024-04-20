import { ErrorMessage, Field } from "formik";

const FormikSelectWeightageField = () => {
  return (
    <div className="flex  flex-col gap-1 h-[76px]">
      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="weightage" className="text-base text-dark">
          Weightage
        </label>
        <Field
          as="select"
          type="text"
          id="weightage"
          autoComplete="current-weightage"
          name="weightage"
          className="p-1 px-2 text-sm rounded-md border-2 border-primary-light hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-primary w-full"
        >
          <option value="">select weightage...</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </Field>
      </div>
      <ErrorMessage
        className="text-red-500 text-xs "
        component="div"
        name="weightage"
      />
    </div>
  );
};

export default FormikSelectWeightageField;
