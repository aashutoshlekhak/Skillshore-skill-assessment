import { FaRegUser } from "react-icons/fa";
import { SiCodefactor } from "react-icons/si";
import { GiBrain } from "react-icons/gi";

const loginInitialValues = { email: "", password: "" };

const registerInitialValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const createProfileValues = {
  skills: "",
  education: "",
  experience: "",
  career: "",
};

const forgotPasswordEmailInitialValues = {
  email: "",
};

const resetPasswordInitialValues = {
  token: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const categoryInitialValues = {
  title: "",
  slug: "",
};

const AddQuizInitialValues = {
  title: "",
  slug: "",
  category_id: 0,
  description: "",
  time: "",
  retry_after: "",
  thumbnail: "",
  question_categories: [],
  status: 1,
  pass_percentage: "",
};

const AddQuestionInitialValues = {
  title: "",
  slug: "",
  description: "",
  options: ["", ""],
  answer: "",
  weightage: 0,
  status: 1,
  category_id: 0,
};

const getAdminCardsData = (savedStatistics: any) => {
  return [
    {
      title: "User",
      listItemOne: "users",
      listItemTwo: "Verified users",
      listItemThree: "Unverified users",
      icon: FaRegUser,
      total: savedStatistics.total_students,
      primaryVariable: savedStatistics.total_verified_students,
      secondaryVariable:
        savedStatistics.total_students -
        savedStatistics.total_verified_students,
    },
    {
      title: "Quiz",
      listItemOne: "quizzes",
      listItemTwo: "Active quizzes",
      listItemThree: "Inactive quizzes",
      icon: GiBrain,
      total: savedStatistics.total_quizzes,
      primaryVariable: savedStatistics.active_quizzes,
      secondaryVariable:
        savedStatistics.total_quizzes - savedStatistics.active_quizzes,
    },
    {
      title: "Question",
      listItemOne: "questions",
      listItemTwo: "Active questions",
      listItemThree: "Inactive questions",
      icon: SiCodefactor,
      total: savedStatistics.total_questions,
      primaryVariable: savedStatistics.active_questions,
      secondaryVariable:
        savedStatistics.total_questions - savedStatistics.active_questions,
    },
  ];
};

export {
  getAdminCardsData,
  AddQuestionInitialValues,
  AddQuizInitialValues,
  categoryInitialValues,
  loginInitialValues,
  registerInitialValues,
  createProfileValues,
  forgotPasswordEmailInitialValues,
  resetPasswordInitialValues,
};
