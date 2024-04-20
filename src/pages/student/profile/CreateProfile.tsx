import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateProfileMutation } from "../../../redux/services/myUserProfileEndpoints";
import { useEffect } from "react";
import { setProfileData } from "../../../redux/slice/userSlice";
import { Formik, Form } from "formik";
import { profileValidationSchema } from "../../../validation";
import { createProfileValues } from "../../../configs/constants";
import { TProfileData } from "../types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ButtonField, CustomInputField } from "../../../components/profile";

const CreateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createUserProfile, { isSuccess, data: profileData, error }] =
    useCreateProfileMutation();

  const handleSubmit = async (values: Omit<TProfileData, "id">) => {
    try {
      let formattedSkills = values.skills;
      formattedSkills = (formattedSkills as string).split(",");
      await createUserProfile({ ...values, skills: formattedSkills });
    } catch (error) {
      console.error("Error updating data :", error);
    }
  };

  useEffect(() => {
    if (isSuccess && profileData) {
      const { data } = profileData;
      dispatch(setProfileData(data));
      toast.success("Profile Created Successfully");
      navigate("/profile");
    }
  }, [isSuccess, profileData]);

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong!!");
    }
  }, [error]);

  return (
    <>
      <div className="h-[full] pl-[70px] pr-[42px] font-poppins">
        <div className="flex flex-col justify-start items-left ">
          <div className="text-primary  text-lg flex items-center gap-1 self-start mt-[37px]">
            <span className="text-primary"> Create Profile</span>
          </div>
        </div>

        <Formik
          initialValues={createProfileValues}
          onSubmit={handleSubmit}
          validationSchema={profileValidationSchema}
        >
          <Form className="flex flex-col justify-center mt-[37px]">
            <CustomInputField
              name="education"
              fieldId="education"
              title="Education"
            />

            <CustomInputField name="career" fieldId="career" title="Career" />
            <CustomInputField
              name="experience"
              fieldId="experience"
              title="Experience"
            />

            <CustomInputField name="skills" fieldId="skills" title="Skills" />
            <ButtonField title="Create Profile" />
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default CreateProfile;
