import { TCommonLinksType, TCommonMetaType } from "./TCommonTypes";

export type TReportDataType = {
  id: number;
  user_id: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  quiz_id: {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    description: string;
    time: number;
    retry_after: number;
    status: number;
    pass_percentage: number;
  };
  passed: number;
  total_question: number;
  total_answered: number;
  total_right_answer: number;
  total_time: number;
};

export type TReportType = {
  data: TReportDataType[];
  links: TCommonLinksType;
  meta: TCommonMetaType;
};
