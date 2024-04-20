import { ChangeEvent } from "react";
import { IoSearch } from "react-icons/io5";
import { debounce } from "lodash";
type Props = {
  searchTerm?: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

const FormSearchbar = ({ setSearchTerm, setCurrentPageNumber }: Props) => {
  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPageNumber(1);
  }, 500);

  return (
    <div className="relative">
      <IoSearch className="absolute text-2xl text-[#8a8a8a] top-[8px] left-3 border-r-2 pr-2" />
      <input
        type="text"
        id="table-search"
        onChange={handleChange}
        className="block p-2 ps-10  text-sm text-gray-900 border-2 border-primary-light hover:outline hover:outline-2 hover:outline-offset-[-2px] hover:outline-primary rounded-md w-80 bg-gray-50  "
        placeholder="Search"
      />
    </div>
  );
};

export default FormSearchbar;
