import { ErrorMessage, Field } from "formik";

const FormikSelectStatus = () => {
  return (
    <div className="flex  flex-col gap-1">
      <div className="flex flex-col gap-2">
        <label htmlFor="status" className="text-base text-dark">
          Status
        </label>
        <Field
          as="select"
          id="status"
          autoComplete="current-status"
          name="status"
          className="p-1 px-2 text-sm rounded-md border-2 border-primary-light hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-primary w-full"
        >
          <option value="" className="text-[#a0a0a0]">
            select status...
          </option>
          <option value={1}>Active</option>
          <option value={0}>Inactive</option>
        </Field>
      </div>
      <ErrorMessage
        className="text-red-500 text-xs"
        component="div"
        name="status"
      />
    </div>
  );
};

export default FormikSelectStatus;
