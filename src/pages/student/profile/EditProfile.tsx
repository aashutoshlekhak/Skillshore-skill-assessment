import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateUserProfileMutation } from "../../../redux/services/myUserProfileEndpoints";
import { setProfileData } from "../../../redux/slice/userSlice";
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";
import { TProfileData } from "../types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../../../redux/store";
import { profileValidationSchema } from "../../../validation";
import {
  BreadCrumb,
  ButtonField,
  CustomInputField,
} from "../../../components/profile";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [
    updateUserProfile,
    { isSuccess: profileUpdateSuccess, data: profileData, error },
  ] = useUpdateUserProfileMutation();

  const UserData = useSelector((state: RootState) => state.user.data.profile);

  const handleSubmit = async (values: TProfileData) => {
    try {
      let skills = values.skills;
      skills = (skills as string).split(",");
      const formattedSkills = skills.filter((skill) => skill.trim() !== "");
      await updateUserProfile({ ...values, skills: formattedSkills });
    } catch (error) {
      console.error("Error updating data :", error);
    }
  };

  useEffect(() => {
    if (profileUpdateSuccess && profileData) {
      const { data } = profileData;
      dispatch(setProfileData(data));
      toast.success("Profile Edited Successfully");
      navigate("/profile");
    }
  }, [profileUpdateSuccess, profileData]);

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error.data.message);
    }
  }, [error]);

  return (
    <>
      {UserData?.education && (
        <div className="h-[full] pl-[70px] pr-[42px] font-poppins">
          <div className="mt-[37px]">
            <BreadCrumb icon={FaUser} title="Profile" subTitle="Edit Profile" />
          </div>

          <Formik
            initialValues={{ ...UserData, skills: UserData.skills.join(", ") }}
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
              <ButtonField title="Save Changes" />
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
};
export default EditProfile;
