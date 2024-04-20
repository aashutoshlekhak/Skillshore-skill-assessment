import { FC } from "react";

interface Props {
  title: string;
}

const ButtonField: FC<Props> = ({ title }) => {
  return (
    <div>
      <button
        type="submit"
        className=" text-white bg-green-700 font-medium mb-[40px] rounded-lg text-sm h-[50px] w-[150px]"
      >
        {title}
      </button>
    </div>
  );
};

export default ButtonField;
