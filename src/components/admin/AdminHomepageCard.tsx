import { IconType } from "react-icons";

type Props = {
  total: number;
  primaryVariable: number;
  secondaryVariable: number;
  title: string;
  listItemOne: string;
  listItemTwo: string;
  listItemThree: string;
  icon: IconType;
};

const AdminHomepageCard = ({
  total,
  primaryVariable,
  secondaryVariable,
  title,
  listItemTwo,
  listItemThree,
  icon: Icon,
}: Props) => {
  return (
    <div className="shadow-3xl border-2 border-primary-light  px-8 py-6 rounded-xl min-w-[300px]">
      <div className="flex gap-12 justify-between items-center ">
        <div>
          <div className="flex items-center gap-3 mb-4 ">
            <h2 className="text-dark text-3xl font-semibold">{total}</h2>
            <p className="text-primary font-semibold text-base tracking-wider bg-slate-100 rounded-md px-3 py-1">
              {title}
            </p>
          </div>
          <div className="flex justify-between gap-4">
            <ul className="text-sm  ">
              <li className="list-item tracking-wide text-[#605f5fd0] whitespace-nowrap">
                {listItemTwo}:
                <span className="font-semibold text-[#424242d0] text-base ml-2">
                  {primaryVariable}
                </span>
              </li>
              <li className="list-item tracking-wide text-[#605f5fd0] whitespace-nowrap">
                {listItemThree}:
                <span className="font-semibold text-[#424242d0] text-base ml-2">
                  {secondaryVariable}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center items-center w-[70px] aspect-square rounded-3xl bg-slate-100 ">
          <Icon className="text-2xl text-primary" />
        </div>
      </div>
    </div>
  );
};

export default AdminHomepageCard;
