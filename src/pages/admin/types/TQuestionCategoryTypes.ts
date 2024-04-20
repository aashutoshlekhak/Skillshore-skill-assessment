import { TCommonLinksType, TCommonMetaType } from "./TCommonTypes";

export type TQuestionCategoryType = {
  id: number;
  title: string;
  slug: string;
};

export type TAddQuestionCategoryFieldType = {
  title: string;
  slug: string;
};

export type TFetchQuestionCategoryType = {
  data: TQuestionCategoryType[];
  links: TCommonLinksType;
  meta: TCommonMetaType;
};

export type TFetchQuestionCategoryQueryTransformReturnType = {
  data: TQuestionCategoryType[];
  meta: TCommonMetaType;
};

export type TEditQuestionCategoryFieldType = {
  id: string;
  title: string;
  slug: string;
};

// TYPES FOR API USED TO FETCH ALL DATA WITHOUT PAGINATON
export type TQuestionCategoryFetchAllType = {
  id: number;
  title: string;
};
export type TQuestionCategoryListFetchAllType = {
  data: TQuestionCategoryFetchAllType[];
};
