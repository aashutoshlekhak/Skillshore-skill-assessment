import { useEffect, useState } from "react";
import { Pagination } from "../../../components";
import { useGetReportQuery } from "../../../redux/services/myReportsApiEndpoints";
import { useLoadingState } from "../../../layouts/AdminLayout";
import { motion } from "framer-motion";
import { TReportDataType } from "../types/TReportTypes";
import FormSearchbar from "../../../components/FormSearchbar";
import {
  saveReportList,
  saveReportMeta,
} from "../../../redux/slice/reportSlice/reportSlice";
import { useDispatch } from "react-redux";
import ListOfReport from "../../../components/ListOfReport";

const Report = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const { setShowLoader } = useLoadingState();
  const {
    data: reportData,
    isLoading,
    isSuccess,
  } = useGetReportQuery({ page: currentPageNumber, searchTerm: searchTerm });

  useEffect(() => {
    if (isSuccess) {
      dispatch(saveReportList(reportData.data));
      dispatch(saveReportMeta(reportData.meta));
    }
    setShowLoader(isLoading);
  }, [isLoading, reportData, isSuccess]);

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      className="flex flex-col basis-full  gap-5 py-10 px-8 "
    >
      <h1 className="text-primary font-medium text-2xl leading-4">Report</h1>

      <div className="flex justify-between">
        <FormSearchbar
          setSearchTerm={setSearchTerm}
          setCurrentPageNumber={setCurrentPageNumber}
        />
      </div>
      <div className=" main-container relative flex flex-col min-h-[666px] outline outline-2  outline-primary-light w-full rounded-md text-center ">
        <div className="title-and-table-div basis-full relative overflow-y-hidden">
          <table className="w-full text-sm text-left  text-dark">
            <thead className="border-b-2 border-primary-light bg-[#fcfcfc] shadow-inner h-14">
              <tr>
                <th scope="col" className="p-2 w-[15%] ">
                  <div className="flex items-center pl-2 w-[20px] text-sm font-semibold">
                    S.N
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 w-auto text-sm font-semibold"
                >
                  User
                </th>

                <th scope="col" className="px-6 py-3 w-[40%] font-semibold">
                  Attempted Quiz
                </th>
                <th scope="col" className="px-6 py-3 w-[15%] font-semibold">
                  Result
                </th>
              </tr>
            </thead>

            <tbody>
              {reportData && reportData.data.length > 0 ? (
                reportData.data?.map(
                  (report: TReportDataType, index: number) => (
                    <ListOfReport
                      key={index}
                      report={report}
                      index={index}
                      from={reportData.meta.from}
                    />
                  )
                )
              ) : (
                <tr className="absolute top-[50%] left-[50%] translate-x-[-50%]">
                  <td>No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <nav
          className="flex mt-auto items-center bg-[#fcfcfc] flex-column  border-t-2 flex-wrap md:flex-row justify-between pt-4 p-3"
          aria-label="Table navigation"
        >
          <Pagination
            setCurrentPageNumber={setCurrentPageNumber}
            currentPageNumber={reportData ? reportData.meta.current_page : 1}
            totalNumberOfPages={reportData ? reportData.meta.last_page : 1}
          />
        </nav>
      </div>
    </motion.div>
  );
};

export default Report;
