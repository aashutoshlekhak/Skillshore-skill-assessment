import { IoMdClose, IoMdStopwatch } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Props = {
  selectQuiz: () => void;
  modalFor: string;
  setShowModal: (action: boolean) => void;
};

const QuizModal = ({ selectQuiz, setShowModal }: Props) => {
  const quizTestSlice = useSelector((state: RootState) => state.allModal.data);

  const StartQuiz = () => {
    selectQuiz();
  };

  const closeModal = (
    e: React.MouseEvent<HTMLDivElement | SVGElement | HTMLButtonElement>
  ) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  return (
    <div
      onClick={closeModal}
      id="popup-modal"
      className=" fixed z-20 top-0 left-0 flex items-center justify-center w-full h-full bg-opacity-50 bg-gray-900 "
    >
      <div className="relative z-10  w-[650px] items-center justify-end ">
        <div className="relative  bg-white  ">
          <button
            type="button"
            className="pb-8 absolute top-3 end-2.5  bg-transparent   text-4xl w-[50px] h-[50px] ms-auto inline-flex justify-center items-center  pt-3 "
            data-modal-hide="popup-modal"
            onClick={() => setShowModal(false)}
          >
            <IoMdClose />
            <span className="sr-only text-xl">Close modal</span>
          </button>
          <div className=" md:p-5 text-center h-auto  ">
            <div className="flex h-[90px] absolute">
              <div className=" ps-2 pe-1    font-bold   h-[40px] w-[70px]">
                <img src={quizTestSlice.thumbnail} alt="quiz" />
              </div>
              <div className="ps-6">
                <h4 className="text-center ps-[90px] text-2xl font-bold pt-7">
                  {quizTestSlice.title}
                </h4>
              </div>
            </div>
            <h3 className="mb-5 pt-[95px] text-[14px]  text-left font-normal text-gray-950 text-clip ">
              {quizTestSlice.description}
            </h3>
            <div className="flex justify-end place-items-end gap-4 pt-5">
              <p className="text-[#2F5CFE] ps-1 pb-[10px] pe-6 text-center text-[14px] font-bold">
                <button className="pe-[5px]">
                  <IoMdStopwatch />
                </button>
                {quizTestSlice.time} min
              </p>
              <button
                onClick={StartQuiz}
                className="text-sm py-2 px-6 rounded-lg border-2  bg-[#2F5CFE] text-white "
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuizModal;
