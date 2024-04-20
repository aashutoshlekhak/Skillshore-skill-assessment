import { useEffect } from "react";
import ReactDom from "react-dom";
import { IoClose } from "react-icons/io5";
import { BiMessageError } from "react-icons/bi";
type Props = {
  deleteFunction: (id: number) => void;
  modalFor: string;
  setShowModal: (a: boolean) => void;
  id: number;
};

const DeleteModal = ({ setShowModal, id, deleteFunction, modalFor }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleDelete = () => {
    deleteFunction(id);
    setShowModal(false);
  };

  const closeModal = (
    e: React.MouseEvent<HTMLDivElement | SVGElement | HTMLButtonElement>
  ) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };
  return ReactDom.createPortal(
    <>
      <div
        onClick={closeModal}
        className="modal-background z-40 fixed inset-0 bg-dark bg-opacity-[40%] flex justify-center items-center"
      >
        <div className="modal-wrapper relative z-50 w-[400px] bg-[#ffffff] rounded-xl p-6 px-10 flex flex-col items-center gap-4">
          <div
            className="absolute cursor-pointer m-2 p-[3px] right-1 top-1 text-2xl "
            onClick={() => setShowModal(false)}
          >
            <IoClose />
          </div>
          <BiMessageError className="text-6xl text-[#868686]" />

          <h1 className=" text-center my-2 mb-3 font-medium text-base">
            Are you sure you want to delete this {modalFor}?
          </h1>
          <div className="flex gap-4">
            <button
              className=" bg-[#ff2d2d]  text-sm text-white py-2 px-6 rounded-lg hover:bg-error"
              onClick={handleDelete}
            >
              Yes, I'm sure
            </button>
            <button
              className="text-sm py-2 px-6 rounded-lg border-2 border-primary-light hover:bg-[#f4f4f4]"
              onClick={closeModal}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal-admin")!
  );
};

export default DeleteModal;
