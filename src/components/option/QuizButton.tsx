import { FC, MouseEventHandler } from "react";

interface Props {
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const QuizButton: FC<Props> = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className=" text-dark text-sm font-semibold rounded-[3px] bg-primary-light  hover:bg-primary hover:text-white py-[16px] px-[24px]"
    >
      {title}
    </button>
  );
};

export default QuizButton;
