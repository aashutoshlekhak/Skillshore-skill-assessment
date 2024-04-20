import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import "react-toastify/dist/ReactToastify.css";
import { FaHouse } from "react-icons/fa6";
import { useSelector } from "react-redux";
import {
  BreadCrumb,
  ButtonField,
  ProfileDetails,
} from "../../../components/profile";

const UserProfile = () => {
  const navigate = useNavigate();

  const userDetails = useSelector((state: RootState) => state.user.data);

  return (
    <div className="h-full px-[70px] pr-[42px] font-poppins ">
      <>
        {userDetails && (
          <>
            <div className="flex justify-between mt-[40px]">
              <BreadCrumb icon={FaHouse} title="Home" subTitle="Profile" />

              {userDetails.name ? (
                <div onClick={() => navigate("/edit-profile")}>
                  <ButtonField title="Edit Profile" />
                </div>
              ) : (
                <div></div>
              )}
            </div>
            {userDetails.name ? (
              <>
                <div className="studentInfo flex flex-col gap-10 mt-[20px] ">
                  <ProfileDetails title={"User Name"} data={userDetails.name} />
                  <ProfileDetails
                    title={"Email Address"}
                    data={userDetails.email}
                  />
                  <ProfileDetails
                    title={"Education"}
                    data={userDetails.profile?.education}
                  />
                  <ProfileDetails
                    title={"Career "}
                    data={userDetails.profile?.career}
                  />
                  <ProfileDetails
                    title={"Experience"}
                    data={userDetails.profile?.experience}
                  />
                  <ProfileDetails
                    title={"Skills"}
                    data={userDetails.profile?.skills?.map((skill, index) => (
                      <li className="list-none" key={index}>{`${
                        index + 1
                      }. ${skill}`}</li>
                    ))}
                  />
                </div>
              </>
            ) : (
              <div className="h-[800px]">
                <p>
                  This current logged in user's profile details is not found.
                  <br />
                  Please contact your administrator for more details
                </p>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default UserProfile;
