import { useEffect, useState } from "react";
import { Tooltip } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDeleteQuizCategoryMutation } from "../redux/services/myQuizCategoryApiEndpoints";
import DeleteModal from "./modals/DeleteModal";
import { TQuizCategoryType } from "../pages/admin/types/TQuizCategoryTypes";
import { toast } from "react-toastify";

type Props = {
  quizCategory: TQuizCategoryType;
  index: number;
  from: number;
};

const ListOfQuizCategory = ({ quizCategory, index, from }: Props) => {
  const navigate = useNavigate();
  const [deleteQuizCategory, { data, isSuccess }] =
    useDeleteQuizCategoryMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    navigate(`editQuizCategory/${quizCategory.id}`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  useEffect(() => {
    if (data && "error" in data) {
      toast.error(data.error);
    } else if (isSuccess) {
      toast.success("Deleted!");
    }
  }, [data, isSuccess]);

  return (
    <>
      <motion.tr
        initial={{ opacity: 0.55 }}
        animate={{ opacity: 1 }}
        key={quizCategory.id}
        className="bg-white border-b hover:bg-gray-50 "
      >
        <td className="pl-6 ">
          <div className="flex my-4 items-center whitespace-nowrap">
            {from + index}
          </div>
        </td>
        <td className="px-6 font-normal text-gray-900 ">
          <div className="line-clamp-1">{quizCategory.title}</div>
        </td>
        <td className="px-6">
          <div className="flex items-center gap-2">
            <Tooltip content="Edit" className="text-blue-600" style="light">
              <button
                onClick={handleEdit}
                className="font-medium  text-blue-600 dark:text-blue-500 hover:underline"
              >
                <span className="relative material-symbols-outlined  text-blue-600 dark:text-blue-500 hover:underline ">
                  Edit
                </span>
              </button>
            </Tooltip>
            <Tooltip content="Delete" className="text-error" style="light">
              <button
                onClick={handleDelete}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                <span className="material-symbols-outlined text-red-600 dark:text-red-500 hover:underline ">
                  Delete
                </span>
              </button>
            </Tooltip>
          </div>
        </td>
      </motion.tr>
      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          id={quizCategory.id}
          deleteFunction={deleteQuizCategory}
          modalFor={"quiz category"}
        />
      )}
    </>
  );
};

export default ListOfQuizCategory;
