import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ListOfQuestionCategory, Pagination } from "../../../components";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useLoadingState } from "../../../layouts/AdminLayout";
import { TQuestionCategoryType } from "../types";
import { useGetQuestionCategoriesQuery } from "../../../redux/services/myQuestionCategoryApiEndpoints";
import {
  saveQuestionCategoriesMetaData,
  saveQuestionCategoryList,
} from "../../../redux/slice/questionCategorySlice/questionCategoryListSlice";
import FormSearchbar from "../../../components/FormSearchbar";

const QuestionCategory = () => {
  const dispatch = useDispatch();

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: questionCategoriesData,
    isLoading,
    isSuccess,
  } = useGetQuestionCategoriesQuery({
    page: currentPageNumber,
    title: searchTerm,
  });

  const { meta } = useSelector(
    (state: RootState) => state.questionCategoryList
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveQuestionCategoryList(questionCategoriesData.data));
      dispatch(saveQuestionCategoriesMetaData(questionCategoriesData.meta));
    }
    setShowLoader(isLoading);
  }, [questionCategoriesData, isLoading, isSuccess]);

  const loadingState = useLoadingState();
  const { setShowLoader } = loadingState;

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      className="flex flex-col basis-full  gap-5 py-10 px-8 "
    >
      <h1 className="text-primary font-medium text-2xl leading-4">
        Question Category
      </h1>

      <div className="flex justify-between">
        <FormSearchbar
          setSearchTerm={setSearchTerm}
          setCurrentPageNumber={setCurrentPageNumber}
        />
        <Link
          to="addQuestionCategory"
          className="bg-dark transition-colors flex items-center text-primary-light rounded-lg text-xs font-medium py-button-padding-y px-button-padding-x outline-offset-[-2px] hover:bg-white hover:outline hover:outline-2 hover:outline-primary hover:text-dark"
        >
          <span>+Add Category</span>
        </Link>
      </div>
      <div className=" main-container relative flex flex-col min-h-[666px] outline outline-2  outline-primary-light w-full rounded-md text-center ">
        <div className="title-and-table-div basis-full relative overflow-y-hidden">
          <table className="w-full text-sm text-left  text-dark">
            <thead className="border-b-2 border-primary-light bg-[#fcfcfc] shadow-inner h-14">
              <tr>
                <th scope="col" className="p-2 w-[8%] ">
                  <div className="flex items-center pl-2 w-[20px] text-sm font-semibold">
                    S.N
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 w-auto text-sm font-semibold"
                >
                  Title
                </th>

                <th scope="col" className="px-6 py-3 w-[15%] font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {questionCategoriesData &&
              questionCategoriesData.data.length > 0 ? (
                questionCategoriesData.data?.map(
                  (questionCategory: TQuestionCategoryType, index: number) => (
                    <ListOfQuestionCategory
                      key={index}
                      questionCategory={questionCategory}
                      index={index}
                      from={questionCategoriesData.meta.from}
                    />
                  )
                )
              ) : (
                <tr className="absolute top-[50%] left-[50%] translate-x-[-50%]">
                  <td>No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <nav
          className="flex mt-auto items-center bg-[#fcfcfc] flex-column  border-t-2 flex-wrap md:flex-row justify-between pt-4 p-3"
          aria-label="Table navigation"
        >
          <Pagination
            setCurrentPageNumber={setCurrentPageNumber}
            currentPageNumber={meta.current_page}
            totalNumberOfPages={meta.last_page}
          />
        </nav>
      </div>
    </motion.div>
  );
};

export default QuestionCategory;
