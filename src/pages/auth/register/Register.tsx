import { Formik, Field, Form, ErrorMessage } from "formik";
import penguinImage from "../../../assets/images/penguin.svg";
import { Link, useNavigate } from "react-router-dom";
import { TRegistrationFormType } from "../types";
import { useRegisterUserMutation } from "../../../redux/services/myRegistrationApiEndpoints";
import registrationSchema from "../../../validation/registrationValidationSchema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { registerInitialValues } from "../../../configs/constants";

const Register: React.FC = () => {
  const [registerUser, { isSuccess, error }] = useRegisterUserMutation();

  const navigate = useNavigate();
  const handleSubmit = async (values: TRegistrationFormType) => {
    try {
      await registerUser(values);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully registered");
      navigate("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error.data.message);
    }
  }, [error]);

  return (
    <>
      <div className="registrationPage m-auto flex justify-around gap-[220px] p-5">
        <div className=" registration w-[500px]  rounded-[32px] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)] py-7 px-7">
          <Formik
            initialValues={registerInitialValues}
            validationSchema={registrationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleBlur }) => (
              <Form className="flex flex-col items-center h-max ">
                <h2 className=" items-center text-center text-3xl leading-[46px] font-bold">
                  Create an account
                </h2>
                <div className="flex flex-col min-h-[84px] py-3 w-full mb-1">
                  <label htmlFor="name">Name</label>
                  <div className="flex flex-col">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      className="w-full h-12 bg-white outline-none rounded-lg border-2 border-indigo-100 px-3 hover:border-accent focus:border-3 focus:border-blue-600"
                    />
                    <ErrorMessage
                      className="text-[13px] font-light text-error py-1"
                      name="name"
                      component="div"
                    />
                  </div>
                </div>
                <div className="flex flex-col min-h-[84px] w-full mb-1">
                  <label htmlFor="email">Email</label>
                  <div className="flex flex-col">
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                      className="w-full h-12 bg-white outline-none rounded-lg border-2 border-indigo-100 px-3 hover:border-accent focus:border-3 focus:border-blue-600"
                    />
                    <ErrorMessage
                      className="text-[13px] font-light text-error py-1"
                      name="email"
                      component="div"
                    />
                  </div>
                </div>
                <div className="flex flex-col min-h-[84px] w-full mb-1">
                  <label htmlFor="password">Password</label>
                  <div className="flex flex-col">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      className="w-full h-12 bg-white outline-none rounded-lg border-2 border-indigo-100 px-3 hover:border-accent focus:border-3 focus:border-blue-600"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <ErrorMessage
                      className="text-[13px] font-light text-error py-1"
                      name="password"
                      component="div"
                    />
                  </div>
                </div>
                <div className="flex flex-col min-h-[84px] w-full mb-1">
                  <label htmlFor="password_confirmation">
                    Confirm Password
                  </label>
                  <div>
                    <input
                      type="password"
                      id="password_confirmation"
                      name="password_confirmation"
                      placeholder="Confirm Password"
                      className="w-full h-12 bg-white outline-none rounded-lg border-2 border-indigo-100 px-3 hover:border-accent focus:border-3 focus:border-blue-600"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <ErrorMessage
                      className="text-[13px] font-light text-error py-1"
                      name="password_confirmation"
                      component="div"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-slate-900 text-sm font-semibold font-['Poppins'] leading-none h-12 px-6 py-4 my-3 bg-amber-400 rounded-lg justify-center items-center gap-2.5 inline-flex hover:outline hover:outline-2 hover:outline-primary"
                >
                  Create Account
                </button>
                <div className="text-center  text-[14px] font-normal">
                  <span className="flex gap-1 mt-[8px] ">
                    Already have an account?{" "}
                    <Link
                      to="/"
                      className="text-primary font-['Poppins'] text-14 leading-18.2 hover:underline"
                    >
                      Login
                    </Link>
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className=" w-1/2 flex justify-center items-center">
          <img src={penguinImage}/>
        </div>
      </div>
    </>
  );
};
export default Register;
