import { useEffect, useState } from "react";
import { useGetAllQuizCategoriesStudentQuery } from "../../../redux/services/myStudentQuizCategoryApiEndpoints";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllQuizStudentQuery,
  useGetPassedQuizzesQuery,
} from "../../../redux/services/myStudentQuizApiEndpoints";
import { saveAllQuizList } from "../../../redux/slice/quizSlice/allQuizListSlice";
import { RootState } from "../../../redux/store";
import { saveAllQuizCategoriesList } from "../../../redux/slice/quizCategorySlice/allQuizCategoriesListSlice";
import Searchbar from "../../../components/SearchBar";
import Button from "../../../components/Button";
import QuizModal from "../../../components/modals/QuizModal";
import { useNavigate } from "react-router-dom";
import { saveQuizDescription } from "../../../redux/slice/quizSlice/quizTestSlice";
import { CiLock } from "react-icons/ci";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import QuizDetails from "../../../components/User/QuizDetails";
import { StudentQuizModalTypes } from "../../admin/types";
import Pagination from "../../../components/Pagination";
import FilterQuizzes from "../../../components/User/FilterQuizzes";
import PassedResults from "../../../components/PassedResults";
import { savePassedQuiz } from "../../../redux/slice/quizSlice/passedQuizSlice";
import { useLoadingState } from "../../../layouts/AdminLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../../../components/User/carouselArrows";

const Home = () => {
  // hooks

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [startQuiz, setStartQuiz] = useState(0);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string[] | number[]>(
    []
  );
  const [quizCategoryArray, setQuizCategoryArray] = useState([
    { id: 0, title: "", isChecked: false },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux Selectors
  const { data: listOfQuiz } = useSelector((state: RootState) => state.allQuiz);

  //  Api Queries
  const { data: quizData, isLoading: isFetchingQuizzes } =
    useGetAllQuizStudentQuery({
      title: searchTerm,
      page: currentPageNumber,
      selectedCategory,
    });
  const {
    data: passedQuiz,
    isSuccess: passedQuizSuccess,
    isLoading: isFetchingPassedQuizzes,
  } = useGetPassedQuizzesQuery({});
  const { data: quizCategoriesData } = useGetAllQuizCategoriesStudentQuery();
  const loadingState = useLoadingState();
  const { setShowLoader } = loadingState;

  // Effects to handle API responses

  useEffect(() => {
    if (quizData) {
      dispatch(saveAllQuizList(quizData));
    }
    if (quizCategoriesData) {
      const allQuizCategoryArray = quizCategoriesData.data;
      dispatch(saveAllQuizCategoriesList(allQuizCategoryArray));
      const quizCategoriesWithIsCheckedState = allQuizCategoryArray.map(
        (quizCategory: any) => {
          return { ...quizCategory, isChecked: false };
        }
      );

      setQuizCategoryArray(quizCategoriesWithIsCheckedState);
    }
  }, [quizCategoriesData, quizData]);

  useEffect(() => {
    if (passedQuizSuccess) {
      dispatch(savePassedQuiz(passedQuiz));
    }
  }, [passedQuizSuccess]);

  useEffect(() => {
    setShowLoader(isFetchingPassedQuizzes || isFetchingQuizzes);
  }, [isFetchingPassedQuizzes, isFetchingQuizzes]);

  // Event Handlers

  const handleClear = () => {
    const tempCategoryArray = quizCategoryArray.map((quizCategory) => {
      return { ...quizCategory, isChecked: false };
    });
    setQuizCategoryArray(tempCategoryArray);
    setSelectedCategory([]);
  };

  const handleCheckbox = (category: number) => {
    setSelectedCategory((prevCategory: any) => {
      if (!prevCategory?.includes(category)) {
        return [...prevCategory, category];
      } else {
        const removeElement = prevCategory.filter(
          (item: number) => item !== category
        );
        return removeElement;
      }
    });
  };

  const handleStart = (quizData: StudentQuizModalTypes) => {
    setStartQuiz(quizData.id);
    dispatch(saveQuizDescription(quizData));
    setShowQuizModal(true);
  };

  // Function
  const selectQuiz = () => {
    navigate(`/quiz/${startQuiz}`);
  };

  const getStatus = (result: any) => {
    if (result && result.passed) {
      return (
        <>
          <span>
            <IoCheckmarkDoneCircle className="inline-block text-green-600" />
          </span>
          <span className="bg-white text-green-600 text-base ms-1 font-medium me-2 ps-2 px-2.5 py-0.5 round ">
            Passed
          </span>
        </>
      );
    }
    if (result && result.next_retry) {
      return (
        <>
          <CiLock className="inline-block text-red-600" />
          <span className="text-red-600 text-base font-medium mt-6 px-1 py-0.5 rounded ">
            Retry this quiz
            <div className="text-center">
              after {result.next_retry.split("from")[0]}
            </div>
          </span>
        </>
      );
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const horizontalLineBaseStyle =
    "border-b-2 border-primary-light w-full my-[16px] opacity-[0.5]";
  if (!quizData || !passedQuiz) return;

  return (
    <section className=" px-[132px] py-[40px]">
      <div className="flex flex-col gap-[24px] items-start">
        <h1 className="text-primary text-2xl font-medium">Test</h1>
        <p className="text-sm text-dark max-w-[672px] font-normal leading-[22.4px] opacity-[0.7]">
          Are you interested in using these skills? This is our way of knowing
          which jobs to match you with. Please take quizzes for the skills you
          want to continue using in your next career.
        </p>
      </div>
      <div className={`${horizontalLineBaseStyle}  my-[32px] `} />
      <div className="grid grid-cols-12 gap-[73px]  min-h-[500px]">
        <div className=" col-span-3 flex flex-col justify-start">
          <div className="flex flex-col gap-4 ">
            <Searchbar
              placeholder="Search"
              searchTerm={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPageNumber(1);
              }}
            />

            <div className="flex justify-between items-center">
              <p className="text-primary text-sm font-semibold text-left">
                {selectedCategory.length} Selected
              </p>
              <Button style="gray" text="Clear" onClick={handleClear} />
            </div>
          </div>
          <div className={horizontalLineBaseStyle} />
          <div className="flex flex-col p-[6px] gap-[16px] max-h-[600px] overflow-y-auto">
            {quizCategoryArray.map((quizCategory, index) => (
              <FilterQuizzes
                key={index}
                quizCategory={quizCategory}
                index={index}
                selectedCategory={selectedCategory}
                handleCheckbox={handleCheckbox}
                setCurrentPageNumber={setCurrentPageNumber}
              />
            ))}
          </div>
        </div>
        <div className="col-span-9 flex gap-5 flex-col ">
          {passedQuiz.data.length > 0 ? (
            <h1 className="col-span-12 text-primary text-2xl font-medium">
              Passed Quizzes
            </h1>
          ) : null}
          <div className="col-span-9 grid grid-cols-4 gap-4">
            {passedQuiz.data.length > 4 ? (
              <div className="col-span-12 ">
                <Slider {...carouselSettings}>
                  {passedQuiz.data.map((quiz, index) => (
                    <PassedResults
                      key={quiz.id}
                      quiz={quiz}
                      index={index}
                      getStatus={getStatus}
                    />
                  ))}
                </Slider>
              </div>
            ) : (
              <div className="col-span-12 grid grid-cols-4 gap-4">
                {passedQuiz.data.map((quiz, index) => (
                  <PassedResults
                    key={quiz.id}
                    quiz={quiz}
                    index={index}
                    getStatus={getStatus}
                  />
                ))}
              </div>
            )}
            {passedQuiz.data.length > 0 && (
              <div
                className={`${horizontalLineBaseStyle} col-span-12  my-[20px] `}
              />
            )}
            <h1 className="col-span-12 text-primary text-2xl font-medium">
              All Quizzes
            </h1>
            <div className="col-span-12 grid grid-cols-4 gap-4">
              {listOfQuiz.map((quiz, index) => (
                <QuizDetails
                  key={quiz.id}
                  quiz={quiz}
                  index={index}
                  getStatus={getStatus}
                  handleStart={handleStart}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {showQuizModal && (
        <QuizModal
          selectQuiz={selectQuiz}
          setShowModal={setShowQuizModal}
          modalFor={"quizModal"}
        />
      )}
      {showQuizModal && (
        <div
          className="fixed  top-0 left-0 right-0 bottom-0 z-1 bg-[#03103F] opacity-50 justify-items-center align-top "
          onClick={() => {
            setShowQuizModal(false);
          }}
        ></div>
      )}
      <nav
        className="flex items-center bg-[#fcfcfc] flex-column  border-t-2 flex-wrap md:flex-row justify-between pt-4 p-3 mt-[50px]"
        aria-label="Table navigation"
      >
        <Pagination
          setCurrentPageNumber={setCurrentPageNumber}
          currentPageNumber={quizData.meta.current_page}
          totalNumberOfPages={quizData.meta.last_page}
        />
      </nav>
    </section>
  );
};

export default Home;
