import { Formik, Form, Field, ErrorMessage } from "formik";
import { TLoginField } from "../types";
import { loginValidationSchema } from "../../../validation";
import { Link } from "react-router-dom";
import { useLoginUserMutation } from "../../../redux/services/myLoginApiEndpoints";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginInitialValues } from "../../../configs/constants";
import { useDispatch } from "react-redux";
import { setToken } from "../../../redux/slice/authSlice";

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();

  const onSubmit = async (
    values: TLoginField,
  ) => {
    const userCredentials = {
      email: values.email.toLowerCase(),
      password: values.password,
    };
    toast.dismiss();
    try {
      const data = await loginUser(userCredentials).unwrap();
      if (data.token) {
        dispatch(setToken(data.token));
        toast.success("Successfully logged in!");
      }
    } catch (error: any) {
      const errorMessage = error.data.message;
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="m-auto shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] w-[370px] h-max text-dark rounded-[24px] p-[40px] ">
        <Formik
          initialValues={loginInitialValues}
          onSubmit={onSubmit}
          validationSchema={loginValidationSchema}
        >
          {({ handleChange, handleBlur }) => (
            <Form className="flex flex-col items-center h-max">
              <p className="font-bold text-[32px] text-dark leading-[32px] mb-[8px]">
                Login
              </p>

              <div className="flex flex-col h-[130px] mt-[22px] mb-[-30px] w-full">
                <label
                  htmlFor="email"
                  className="text-base font-normal text-dark"
                >
                  Email
                </label>
                <Field
                  className="h-field-height w-full text-base border-[2px] outline-none border-primary-light rounded-[10px] px-3 hover:border-accent focus:border-3 focus:border-blue-600 "
                  type="email"
                  placeholder="Email"
                  id="email"
                  autoComplete="current-email"
                  name="email"
                />
                <ErrorMessage
                  className="text-[13px] text-error"
                  component="div"
                  name="email"
                />
              </div>
              <div className="flex flex-col h-[110px] w-full">
                <label
                  htmlFor="password"
                  className="text-base font-normal text-dark"
                >
                  Password
                </label>
                <input
                  className="h-field-height w-full text-base border-[2px] outline-none border-primary-light rounded-[10px] px-3 hover:border-accent focus:border-3 focus:border-primary"
                  type="password"
                  placeholder="Password"
                  id="password"
                  autoComplete="current-password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  className="text-[13px] text-error leading-[12px] mt-[3px]"
                  component="div"
                  name="password"
                />
              </div>
              <button
                type="submit"
                className="px-button-padding-x py-button-padding-y rounded-[10px]  mb-[18px] bg-accent text-dark font-semibold font-poppins hover:outline hover:outline-2 hover:outline-primary focus:outline focus:outline-2 focus:outline-primary"
              >
                Login
              </button>
              <div className="flex gap-1 mt-[9px] text-text-dark">
                <p className="text-[14px] font-normal">
                  Don't have an account?
                </p>
                <Link
                  to="register"
                  className="text-[14px] font-normal text-primary font-poppins rounded-sm hover:underline focus:outline focus:outline-2 focus:outline-primary"
                >
                  Register
                </Link>
              </div>
              <Link
                to="forgot-password"
                className="text-[14px] font-normal mt-[8px] rounded-sm text-primary hover:underline focus:outline focus:outline-2 focus:outline-primary"
              >
                Forgot Password?
              </Link>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;