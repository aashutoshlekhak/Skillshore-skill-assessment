type Props = {
  index: number;
  quizCategory: any;
  selectedCategory: any;
  handleCheckbox: (a: any) => void;
  setCurrentPageNumber: any;
};
const FilterQuizzes = ({
  index,
  quizCategory,
  selectedCategory,
  handleCheckbox,
  setCurrentPageNumber,
}: Props) => {
  return (
    <div key={index} className="flex gap-4 items-center">
      <input
        className=" border-primary-light rounded-sm text-primary bg-white"
        type="checkBox"
        id={`quizcategory${index + 1}`}
        name={quizCategory.title}
        onChange={() => {
          handleCheckbox(quizCategory.id);
          setCurrentPageNumber(1);
        }}
        checked={
          selectedCategory.length > 0 &&
          selectedCategory.includes(quizCategory.id)
        }
      />
      <label
        className="text-sm text-dark font-normal"
        htmlFor={`quizcategory${index + 1}`}
      >
        {quizCategory.title}
      </label>
    </div>
  );
};

export default FilterQuizzes;
