import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { TForgotPasswordEmailField } from "../types";
import { forgotPasswordEmailFieldSchema } from "../../../validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForgotPasswordMutation } from "../../../redux/services/myForgotPasswordApiEndpoints";
import { useEffect } from "react";
import { forgotPasswordEmailInitialValues } from "../../../configs/constants";

const ForgotPassword: React.FC = () => {
  const [forgotPassword, { isSuccess, error }] = useForgotPasswordMutation();

  const handleSubmit = async (values: TForgotPasswordEmailField) => {
    try {
      await forgotPassword(values);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Please check your email to see verification link");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error.data.message);
    }
  }, [error]);

  return (
    <div className="flex m-auto h-max">
      <div className="relative shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] w-[470px] h-max text-dark rounded-[24px] py-[20px] px-[40px] ">
        <Formik
          initialValues={forgotPasswordEmailInitialValues}
          validationSchema={forgotPasswordEmailFieldSchema}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col items-center h-max">
            <h2 className=" items-center text-center text-2xl leading-[46px] font-bold">
              Enter your email
            </h2>
            <p className=" mt-[6px] mb-[10px] text-[12px] font-light text-center">
              Enter the email address associated with your account and we'll{" "}
              <br /> send you a link to reset your password
            </p>
            <div className="flex flex-col min-h-[84px] w-full mb-1">
              <label htmlFor="email">Email</label>
              <div className="flex flex-col">
                <Field
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full h-12 bg-white rounded-lg border-2 outline-none border-indigo-100 px-3 hover:border-accent focus:border-3 focus:border-blue-600"
                />
                <ErrorMessage
                  className="text-[13px] font-light text-error py-1"
                  name="email"
                  component="div"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-slate-900 text-sm font-semibold font-['Poppins'] leading-none h-12 px-6 py-4 my-3 bg-amber-400 rounded-lg justify-center items-center gap-2.5 inline-flex hover:outline hover:outline-2 hover:outline-primary"
            >
              Submit
            </button>
            <div className="flex gap-1 mt-[8px] text-text-dark">
              <span className=" text-[14px] font-normal text-text-dark">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-normal text-primary font-poppins rounded-sm hover:underline focus:outline focus:outline-2 focus:outline-primary"
                >
                  Register
                </Link>
              </span>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
