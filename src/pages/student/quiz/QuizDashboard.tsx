import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  setQuizData,
  setQuizDataToInitial,
} from "../../../redux/slice/quizSlice";
import { LineWave } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  useGetQuizOptionsQuery,
  usePostQuizDataMutation,
} from "../../../redux/services/myQuizOptionsEndpoints";
import { setAnswerData } from "../../../redux/slice/userQuizSlice";
import { useParams } from "react-router-dom";
import {
  OptionField,
  QuizButton,
  QuizQuestionField,
  Timer,
} from "../../../components/option";
import { QuizDetails } from "../types";

const QuizDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: quizId } = useParams();

  const [postQuizData] = usePostQuizDataMutation();

  const { data, isLoading, isError, error } = useGetQuizOptionsQuery(
    quizId as unknown as number
  );
  const quizDetails = useSelector(
    (state: RootState) => state.quiz.data as QuizDetails
  );
  const quizAnswer = useSelector((state: RootState) => state.answer.data);
  const [index, setIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [timer, setTimer] = useState(0);
  const { questions } = quizDetails?.questions?.data || { questions: [] };
  const { time } = quizDetails;

  useEffect(() => {
    if (data) {
      dispatch(setQuizData(data));
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      if ("data" in error) {
        toast.error(error.data.message);
      }
      navigate("/home");
    }
  }, [isError, error]);

  useEffect(() => {
    const data = { ...quizAnswer, quiz_id: quizId };
    dispatch(setAnswerData(data));
  }, [data]);

  const updateTimeLeft = (newTime: number) => {
    setTimer(newTime);
  };

  const handleOption = (index: number, value: string) => {
    setSelectedOptionIndex(index);
    setSelectedOption(value);
  };

  const nextButton = () => {
    if (selectedOptionIndex !== null && selectedOptionIndex >= 0) {
      const data = {
        ...quizAnswer,
        answers: [
          ...quizAnswer.answers,
          {
            question_id: questions[index].id,
            answer: selectedOption,
          },
        ],
        total_question: index + 1,
      };

      setIndex(index + 1);
      dispatch(setAnswerData(data));
      setSelectedOptionIndex(null);
    } else {
      toast.error("Please select an answer before moving to the next question");
    }
  };

  const submitQuiz = () => {
    if (selectedOptionIndex === null) {
      toast.error("Please select an answer before moving to the next question");
    } else {
      const data = {
        ...quizAnswer,
        answers: [
          ...quizAnswer.answers,
          {
            question_id: questions[index].id,
            answer: selectedOption,
          },
        ],
        total_time: timer,
        total_question: index + 1,
      };
      dispatch(setAnswerData(data));
      postQuizData(data);
      toast.info("Quiz Submitted!");
      navigate("/home");
      dispatch(setQuizDataToInitial());
    }
  };

  const handleTimeout = () => {
    const data = { ...quizAnswer, total_time: timer };
    postQuizData(data);
    navigate("/home");
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      const data = {
        ...quizAnswer,
        total_time: timer,
        total_question: index + 1,
        quiz_id: quizId,
      };
      postQuizData(data);
      dispatch(setQuizDataToInitial());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [postQuizData, quizAnswer, quizId, timer, index]);

  if (isLoading) {
    return (
      <div className="flex justify-center h-[800px]">
        <LineWave color="#1a2b48" height={100} />
      </div>
    );
  }

  return (
    <div className="h-max w-full px-[50px] font-poppins">
      <div className=" grid grid-cols-2  items-center  ">
        <img
          src={quizDetails.thumbnail}
          className=" h-[150px] w-[200px] my-5"
        />
        <div className="flex justify-end">
          <p className="text-4xl font-medium text-primary">
            {time && (
              <Timer
                initialTime={time * 60}
                onTimeout={handleTimeout}
                updateTimeLeft={updateTimeLeft}
              />
            )}
          </p>
        </div>
      </div>
      <div className="border-t border-primary-light ml-[23px]"></div>
      <div className=" grid grid-cols-2 ml-[23px]  h-max w-full  ">
        <div className="border-r border-primary-light ">
          <QuizQuestionField
            title={questions[index]?.title}
            description={questions[index]?.description}
          />
        </div>
        <div className=" pl-10 grid grid-cols-1 mt-5 ">
          <div className=" flex justify-between items-center mb-7">
            <p className=" text-dark text-sm font-semibold">
              Select one answer
            </p>

            {index == questions.length - 1 ? (
              <QuizButton onClick={submitQuiz} title="Submit" />
            ) : (
              <QuizButton onClick={nextButton} title="Next Question" />
            )}
          </div>
          <div className=" grid grid-cols-1 row-span-5  ">
            {questions[index]?.options.map((option: string, index: number) => (
              <OptionField
                key={index}
                onSelect={handleOption}
                option={option}
                index={index}
                isSelected={index === selectedOptionIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDashboard;
