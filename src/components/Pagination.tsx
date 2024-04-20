type Props = {
  setCurrentPageNumber: (a: number) => void;
  currentPageNumber: number;
  totalNumberOfPages: number;
};

const Pagination = ({
  setCurrentPageNumber,
  currentPageNumber,
  totalNumberOfPages,
}: Props) => {
  return (
    <div className="ml-auto ">
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            onClick={() => {
              if (currentPageNumber > 1) {
                setCurrentPageNumber(currentPageNumber - 1);
              }
            }}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Previous
          </button>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
          >
            {currentPageNumber} of {totalNumberOfPages}
          </a>
        </li>

        <li>
          <button
            onClick={() => {
              if (currentPageNumber < totalNumberOfPages) {
                setCurrentPageNumber(currentPageNumber + 1);
              }
            }}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
