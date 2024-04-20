import { TProfileDetails } from "../../pages/student/types";

const ProfileDetails = ({ title, data }: TProfileDetails) => {
  return (
    <div className="studentInfo flex flex-col gap-10 ">
      <div className="Profile grid grid-cols-2">
        <p className=" text-dark font-medium">{title}</p>
        <div className="flex justify-between">
          <p className=" text-dark font-medium ">{data}</p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ProfileDetails;
