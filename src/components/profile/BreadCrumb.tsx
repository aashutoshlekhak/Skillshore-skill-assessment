import { FC } from "react";
import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface Props {
  icon: IconType;
  title: string;
  subTitle: string;
  backToPage?: string;
}

const BreadCrumb: FC<Props> = ({ icon: Icon, title, subTitle, backToPage }) => {
  const navigate = useNavigate();
  return (
    <div className="text-primary p-1 pl-0  pr-3 rounded-md text-opacity-80 text-sm mb-5 flex items-center gap-1 self-start ">
      <div
        className="flex gap-2  cursor-pointer"
        onClick={() => {
          if (backToPage) {
            navigate(backToPage);
          } else {
            navigate(-1);
          }
        }}
      >
        <Icon className="text-lg" />
        <span className="hover:underline">{title}</span>
      </div>
      <MdOutlineKeyboardArrowRight className="text-xl" />
      <span className="text-[#82a6ef]">{subTitle}</span>
    </div>
  );
};

export default BreadCrumb;
