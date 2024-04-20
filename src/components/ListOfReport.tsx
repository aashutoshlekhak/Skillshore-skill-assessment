import { motion } from "framer-motion";
import { TReportDataType } from "../pages/admin/types/TReportTypes";
import { Badge } from "flowbite-react";

type Props = {
  report: TReportDataType;
  index: number;
  from: number;
};

const ListOfReport = ({ report, index, from }: Props) => {
  return (
    <>
      <motion.tr
        initial={{ opacity: 0.55 }}
        animate={{ opacity: 1 }}
        key={report.id}
        className="bg-white border-b hover:bg-gray-50"
      >
        <td className="pl-6 ">
          <div className="flex my-4 items-center whitespace-nowrap">
            {from + index}
          </div>
        </td>
        <td className="px-6 font-normal text-gray-900 ">
          <div className="line-clamp-1">{report.user_id.name}</div>
        </td>
        <td className="px-6 font-normal text-gray-900 ">
          <div className="line-clamp-1">{report.quiz_id.title}</div>
        </td>
        <td className="px-6 font-normal text-gray-900 ">
          <div className="w-max">
            {report.passed ? (
              <Badge color="success" size="sm">
                Passed
              </Badge>
            ) : (
              <Badge color="failure" size="sm">
                Failed
              </Badge>
            )}
          </div>
        </td>
      </motion.tr>
    </>
  );
};

export default ListOfReport;
