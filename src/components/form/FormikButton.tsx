type Props = {
  type: "submit" | "reset" | "button";
  label: string;
};

const FormikButton = ({ type, label }: Props) => {
  return (
    <button
      type={type}
      className="bg-dark w-max row-start-6 text-primary-light rounded-md text-base font-medium py-button-padding-y px-16 mt-5 outline-offset-[-2px] hover:bg-white hover:outline hover:outline-2 hover:outline-primary hover:text-dark"
    >
      {label}
    </button>
  );
};

export default FormikButton;
