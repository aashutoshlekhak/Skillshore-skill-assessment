import React from "react";
import { FaCheck } from "react-icons/fa";
import { TOptionFieldProps } from "../../pages/student/types";

const OptionField = ({
  index,
  option,
  onSelect,
  isSelected,
}: TOptionFieldProps) => {
  const handleSelect: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    onSelect(index, option);
  };

  const alphaIndex = String.fromCharCode(65 + index);

  return (
    <div
      onClick={handleSelect}
      className=" flex  h-[120px] mb-7  cursor-pointer rounded-none border-[1px]"
    >
      <div
        className={`font-bold cursor-pointer  ${
          isSelected
            ? "bg-primary text-white p-6"
            : "text-primary bg-primary-light p-[1.66rem]"
        }  h-full `}
      >
        {alphaIndex}
        {isSelected && (
          <FaCheck
            color="white"
            className=" text-primary mt-5  cursor-pointer"
          />
        )}
      </div>
      <div className="ml-5 cursor-pointer mt-[20px]">{option}</div>
    </div>
  );
};

export default OptionField;
