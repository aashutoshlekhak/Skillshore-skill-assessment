import ReactSelect from "react-select";
type Props = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  options: { value: number; label: string }[];
  selected?: any;

  handleBlur: any;
};

const QuestionCategoriesCustomSelect = ({
  options,
  setFieldValue,
  selected,
  handleBlur,
}: Props) => {
  return (
    <>
      <ReactSelect
        styles={{
          multiValue: (baseStyles) => ({
            ...baseStyles,
          }),
          container: (baseStyles) => ({
            ...baseStyles,
            display: "flex",
            alignItems: "flex-start",
            flex: 1,
            border: "none",
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            width: "100%",
            minHeight: "20px",
            maxHeight: "66px",
            overflowY: "auto",
            outline: "2px solid #E1E7FF",
            border: "none",
            outlineColor: state.isFocused ? "#2F5CFE" : "#E1E7FF",
            "&:hover": {
              outline: "2px solid #2F5CFE",
            },
          }),
          dropdownIndicator: () => ({
            display: "none",
          }),
          clearIndicator: (baseStyles) => ({
            ...baseStyles,
            cursor: "pointer",
            alignSelf: "flex-start",
            transform: "none",

            ":hover": {
              color: "red",
              backgroundColor: "#efb1b157",
              borderRadius: "4px",
            },
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
        }}
        onBlur={(e) => handleBlur(e)}
        defaultValue={selected}
        options={options}
        onChange={(selectedOption) => {
          setFieldValue(
            "question_categories",
            selectedOption.map((option) => option.value)
          );
        }}
        isMulti={true}
      />
    </>
  );
};

export default QuestionCategoriesCustomSelect;
