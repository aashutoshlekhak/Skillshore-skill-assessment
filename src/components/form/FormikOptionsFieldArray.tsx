import { Tooltip } from "flowbite-react";
import { ErrorMessage, Field, FieldArray } from "formik";
import { ChangeEvent } from "react";
import { ImCross } from "react-icons/im";
import { MdAdd, MdOutlineRemove } from "react-icons/md";
import { motion } from "framer-motion";

type Props = {
  optionsArray: string[];
  setOptionsArray: React.Dispatch<React.SetStateAction<string[]>>;
  handleOptionsInputChange: (a: number, b: string) => void;
  handleChange: (a: ChangeEvent) => void;
};

const FormikOptionsFieldArray = ({
  optionsArray,
  setOptionsArray,
  handleOptionsInputChange,
  handleChange,
}: Props) => {
  return (
    <div className="flex flex-col col-span-2 gap-2 ">
      <FieldArray name="options">
        {({ form, push, pop, remove }) => {
          const { values } = form;
          const { options } = values;

          return (
            <>
              <div className="flex gap-2 items-center">
                <p className="text-base text-dark mr-3">Options</p>
                <Tooltip
                  content="Add Option"
                  className="text-primary"
                  style="light"
                >
                  <button
                    className="flex items-center bg-primary-light p-[4px] rounded-md"
                    type="button"
                    onClick={() => {
                      if (optionsArray.length < 6) {
                        push("");
                        setOptionsArray([...optionsArray, ""]);
                      }
                    }}
                  >
                    <MdAdd className="text-primary text-xl" />
                  </button>
                </Tooltip>
                <Tooltip
                  content="Remove Option"
                  className="text-error"
                  style="light"
                >
                  <button
                    className="flex items-center bg-primary-light p-[4px] rounded-md"
                    type="button"
                    onClick={() => {
                      if (optionsArray.length > 2) {
                        pop();
                        const indexToRemove = optionsArray.length - 1;
                        setOptionsArray(optionsArray.slice(0, indexToRemove));
                      }
                    }}
                  >
                    <MdOutlineRemove className="text-primary text-xl" />
                  </button>
                </Tooltip>
              </div>
              <div className=" grid grid-cols-2 gap-x-3 gap-y-2">
                {options.map((_: any, index: number) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={index}
                      className="h-[112px] relative"
                    >
                      <ImCross
                        onClick={() => {
                          if (optionsArray.length > 2) {
                            remove(index);

                            setOptionsArray((prevOptions) =>
                              prevOptions.filter((_, i) => i !== index)
                            );
                          }
                        }}
                        className="absolute cursor-pointer text-[#fb6e6e] text-xl top-[6px] right-[6px] p-[4px] rounded-sm bg-primary-light bg-opacity-[70%] hover:bg-red-200"
                      />
                      <div className="flex gap-2 items-center">
                        <label
                          htmlFor={`option-${index + 1}`}
                          className="text-sm self-start pt-1"
                        >{`${index + 1})`}</label>
                        <Field
                          as="textarea"
                          className="p-1 px-2 text-sm rounded-md border-2 border-primary-light hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-primary w-full h-24 resize-none"
                          id={`option-${index + 1}`}
                          placeholder={`option ${index + 1}`}
                          name={`options[${index}]`}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            handleOptionsInputChange(index, e.target.value);
                            handleChange(e);
                          }}
                        />
                      </div>
                      <ErrorMessage
                        className="text-red-500 text-xs ml-6 my-1"
                        component="div"
                        name={`options[${index}]`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </>
          );
        }}
      </FieldArray>
    </div>
  );
};

export default FormikOptionsFieldArray;
