import { TCommonLinksType, TCommonMetaType } from "./TCommonTypes";

export type TStudentAllQuizType = {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  time: number;
  retry_after: number;
  status: number;
  result: string;
  categories: string;
  category: string;
};

export type TAddStudentQuizFieldType = {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  timer: number;
  retry_after: number;
  result: string;
};

export type TFetchQuizQueryTransformResponseType = {
  data: TStudentAllQuizType[];
  meta: TCommonMetaType;
};

export type TFetchQuizQueryResponseType = {
  data: TStudentAllQuizType[];
  meta: TCommonMetaType;
  links: TCommonLinksType;
};
