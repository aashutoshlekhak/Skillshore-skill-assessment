import { motion } from "framer-motion";
import { useGetStatisticsQuery } from "../../../redux/services/myStatisticsApiEndpoints";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import AdminHomepageCard from "../../../components/admin/AdminHomepageCard";
import { saveStatistics } from "../../../redux/slice/statisticsSlice";
import { useLoadingState } from "../../../layouts/AdminLayout";
import { toast } from "react-toastify";
import { getAdminCardsData } from "../../../configs/constants";

const AdminHomepage = () => {
  const dispatch = useDispatch();

  const loadingState = useLoadingState();
  const { setShowLoader } = loadingState;

  const { data: statistics, isLoading, isError } = useGetStatisticsQuery();

  const savedStatistics = useSelector(
    (state: RootState) => state.statistics.data
  );

  const cards = getAdminCardsData(savedStatistics);

  useEffect(() => {
    setShowLoader(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (statistics) {
      dispatch(saveStatistics(statistics));
    }
    if (isError) {
      toast.error("Error fetching data!");
    }
  }, [statistics, isError]);

  return (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      className="flex flex-col basis-full  gap-10 py-10 px-8 "
    >
      <h1 className="text-primary font-medium text-2xl leading-4">Dashboard</h1>
      <div className="flex gap-8">
        {cards?.map((prop) => (
          <AdminHomepageCard
            key={prop.title}
            total={prop.total}
            primaryVariable={prop.primaryVariable}
            secondaryVariable={prop.secondaryVariable}
            title={prop.title}
            listItemOne={prop.listItemOne}
            listItemTwo={prop.listItemTwo}
            listItemThree={prop.listItemThree}
            icon={prop.icon}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AdminHomepage;
