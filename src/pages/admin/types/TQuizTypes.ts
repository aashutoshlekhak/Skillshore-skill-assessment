import { TCommonLinksType, TCommonMetaType } from "./TCommonTypes";

export type TQuizType = {
  id: number;
  title: string;
  slug: string;
  thumbnail: File | string;
  description: string;
  time: number;
  retry_after: number;
  status: number;
  category: {
    id: number;
    title: string;
  };
};

export type TQuestionCategoryObjType = {
  id: number;
  title: string;
};
export type TSingleQuizType = {
  data: {
    id: number;
    title: string;
    slug: string;
    thumbnail: string;
    description: string;
    time: number;
    retry_after: number;
    status: number;
    pass_percentage: number;
    category: {
      id: number;
      title: string;
    };
    question_categories: TQuestionCategoryObjType[];
  };
};

export type TReactSelectType = {
  value: number;
  label: string;
};

export type TSingleQuizTransformResponseType = {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  thumbnail_url: string;
  description: string;
  time: number;
  retry_after: number;
  status: number;
  pass_percentage: number;
  category: {
    id: number;
    title: string;
  };
  category_id: number;
  question_categories: number[];
  question_categories_obj: TReactSelectType[];
};

export type TAddQuizFieldType = {
  title: string;
  slug: string;
  category_id: number;
  thumbnail: File | string;
  description: string;
  time: string | number;
  retry_after: string | number;
  question_categories: number[];
  status: number;
  pass_percentage: string | number;
};

export type TFetchQuizzesType = {
  data: TQuizType[];
  links: TCommonLinksType;
  meta: TCommonMetaType;
};

export type TFetchQuizzesQueryTransformReturnType = {
  data: TQuizType[];
  meta: TCommonMetaType;
};

export type TEditQuizFieldType = {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  thumbnail: File | string;
  description: string;
  time: string | number;
  retry_after: string | number;
  question_categories: number[];
  status: number;
  pass_percentage: string | number;
};

export type TAddQuizFieldInitialStateType = {
  data: TAddQuizFieldType;
};

export type TEditQuizFieldInitialStateType = {
  data: TQuizType;
};

export type option = { value: number; label: string };
