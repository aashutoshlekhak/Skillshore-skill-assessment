import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ForgotPassword, ResetPassword } from "./pages/auth/forgotPassword";
import { AdminLayout } from "./layouts";
import {
  QuestionCategory,
  AddQuestionCategory,
} from "./pages/admin/questionCategory";
import { QuizCategory, AddQuizCategory } from "./pages/admin/quizCategory";
import { Quiz, AddQuiz } from "./pages/admin/quiz";
import { Question, AddQuestion, EditQuestion } from "./pages/admin/question";
import { Report } from "./pages/admin/report";
import { AdminDashboardLayout } from "./layouts";
import EditQuizCategory from "./pages/admin/quizCategory/EditQuizCategory";
import EditQuestionCategory from "./pages/admin/questionCategory/EditQuestionCategory";
import EditQuiz from "./pages/admin/quiz/EditQuiz";
import PageNotFound from "./pages/PageNotFound";
import { AuthWrapper } from "./routes";
import {
  UserProfile,
  EditProfile,
  CreateProfile,
} from "./pages/student/profile";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import CommonLayout from "./layouts/CommonLayout";
import QuizDashboard from "./pages/student/quiz/QuizDashboard";
import AdminHomepage from "./pages/admin/home/AdminHomepage";
import Home from "./pages/student/home/Home";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthWrapper>
          <Routes>
            <Route
              path="/"
              element={
                <AuthWrapper>
                  <CommonLayout layoutFor="auth" />
                </AuthWrapper>
              }
            >
              <Route index element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="password-reset/:id" element={<ResetPassword />} />
            </Route>

            <Route element={<CommonLayout layoutFor="user" />}>
              <Route
                path="/home"
                element={
                  <AuthWrapper>
                    <Home />
                  </AuthWrapper>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthWrapper>
                    <UserProfile />
                  </AuthWrapper>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <AuthWrapper>
                    <EditProfile />
                  </AuthWrapper>
                }
              />
              <Route
                path="/create-profile"
                element={
                  <AuthWrapper>
                    <CreateProfile />
                  </AuthWrapper>
                }
              />
              <Route
                path="/quiz/:id"
                element={
                  <AuthWrapper>
                    <QuizDashboard />
                  </AuthWrapper>
                }
              />
            </Route>
            <Route path="*" element={<PageNotFound />} />

            <Route path="/admin">
              <Route
                element={
                  <AuthWrapper>
                    <AdminLayout />
                  </AuthWrapper>
                }
              >
                <Route element={<AdminDashboardLayout />}>
                  <Route index element={<AdminHomepage />} />
                  <Route path="quizCategory">
                    <Route index element={<QuizCategory />} />
                    <Route
                      path="addQuizCategory"
                      element={<AddQuizCategory />}
                    />
                    <Route
                      path="editQuizCategory/:id"
                      element={<EditQuizCategory />}
                    />
                  </Route>
                  <Route path="quiz">
                    <Route index element={<Quiz />} />
                    <Route path="addQuiz" element={<AddQuiz />} />
                    <Route path="editQuiz/:id" element={<EditQuiz />} />
                  </Route>
                  <Route path="questionCategory">
                    <Route index element={<QuestionCategory />} />
                    <Route
                      path="addQuestionCategory"
                      element={<AddQuestionCategory />}
                    />
                    <Route
                      path="editQuestionCategory/:id"
                      element={<EditQuestionCategory />}
                    />
                  </Route>
                  <Route path="question">
                    <Route index element={<Question />} />
                    <Route path="addQuestion" element={<AddQuestion />} />
                    <Route path="editQuestion/:id" element={<EditQuestion />} />
                  </Route>
                  <Route path="report" element={<Report />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Route>
          </Routes>
        </AuthWrapper>
      </BrowserRouter>
    </div>
  );
};

export default App
