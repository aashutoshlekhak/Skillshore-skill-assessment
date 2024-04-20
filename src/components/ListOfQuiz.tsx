import { useEffect, useState } from "react";
import { Tooltip, Badge } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { TQuizType } from "../pages/admin/types";
import { motion } from "framer-motion";
import { useDeleteQuizMutation } from "../redux/services/myQuizApiEndpoints";
import DeleteModal from "./modals/DeleteModal";
import { toast } from "react-toastify";

type Props = {
  quiz: TQuizType;
  index: number;
  from: number;
};

const ListOfQuiz = ({ quiz, index, from }: Props) => {
  const navigate = useNavigate();
  const [deleteQuiz, { data, isSuccess }] = useDeleteQuizMutation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [active, setActive] = useState(false);

  const handleEdit = () => {
    navigate(`editQuiz/${quiz.id}`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  useEffect(() => {
    if (quiz.status === 1) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [quiz.status, setActive]);

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
        key={quiz.id}
        className="bg-white border-b hover:bg-gray-50 "
      >
        <td className="pl-6 ">
          <div className="flex my-4 items-center whitespace-nowrap">
            {from + index}
          </div>
        </td>
        <td className="px-6 font-normal text-gray-900 ">
          <div className="line-clamp-1">{quiz.title}</div>
        </td>
        <td className="px-6 font-normal text-gray-900  whitespace-nowrap">
          {quiz.time}
        </td>
        <td className=" px-6 font-normal text-gray-900 whitespace-nowrap">
          <div className="w-max">
            {active ? (
              <Badge color="success" size="sm">
                Active
              </Badge>
            ) : (
              <Badge color="failure" size="sm">
                Inactive
              </Badge>
            )}
          </div>
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
          id={quiz.id}
          deleteFunction={deleteQuiz}
          modalFor={"quiz"}
        />
      )}
    </>
  );
};

export default ListOfQuiz;
