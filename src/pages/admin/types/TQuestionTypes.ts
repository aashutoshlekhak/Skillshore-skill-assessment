import { TCommonLinksType, TCommonMetaType } from "./TCommonTypes";

export type TQuestionType = {
  id: number;
  title: string;
  slug: string;
  description: string;
  options: string[];
  answer: string;
  weightage: number;
  status: number;
  category: { id: number; title: string };
};
export type TSingleQuestionType = {
  data: {
    id: number;
    title: string;
    slug: string;
    description: string;
    options: string[];
    answer: string;
    weightage: number;
    status: number;
    category: { id: number; title: string };
  };
};
//added undefined to weightage and in initialState of addquestionslice
export type TAddQuestionFieldType = {
  title: string;
  slug: string;
  description: string;
  options: string[];
  answer: string;
  weightage: number;
  status: number;
  category_id: number;
};

export type TFetchQuestionsType = {
  data: TQuestionType[];
  links: TCommonLinksType;
  meta: TCommonMetaType;
};

export type TFetchQuestionsQueryTransformReturnType = {
  data: TQuestionType[];
  meta: TCommonMetaType;
};

export type TEditQuestionFieldType = {
  id: number;
  title: string;
  slug: string;
  description: string;
  options: string[];
  answer: string;
  weightage: number | undefined;
  status: number;
  category_id: number;
};
