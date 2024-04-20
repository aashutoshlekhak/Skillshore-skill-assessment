import { FC } from "react";

interface Props {
  title: string;
  description: string;
}

const QuizQuestionField: FC<Props> = ({ title, description }) => {
  return (
    <div className=" flex flex-col gap-[25px]   ">
      <p className="text-dark text-[18px] mt-5 font-semibold">{title}</p>
      <div className="h-auto pr-[30px] mb-5">
        <p className="items-center text-justify">{description}</p>
      </div>
    </div>
  );
};

export default QuizQuestionField;
