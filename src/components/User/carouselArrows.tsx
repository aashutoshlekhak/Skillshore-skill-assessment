import { GoChevronRight, GoChevronLeft } from "react-icons/go";

const CustomArrowStyles = "text-gray-400 scale-[200%] hover:text-primary";

export function NextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <GoChevronRight
      className={`${className} ${CustomArrowStyles}`}
      onClick={onClick}
    />
  );
}

export function PrevArrow(props: any) {
  const { className, onClick } = props;

  return (
    <GoChevronLeft
      className={`${className} ${CustomArrowStyles}`}
      onClick={onClick}
    />
  );
}
