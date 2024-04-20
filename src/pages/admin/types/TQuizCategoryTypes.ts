import { TCommonLinksType, TCommonMetaType } from "./TCommonTypes";

export type TQuizCategoryType = {
  id: number;
  title: string;
  slug: string;
};

export type TAddQuizCategoryFieldType = {
  title: string;
  slug: string;
};

export type TFetchQuizCategoriesType = {
  data: TQuizCategoryType[];
  links: TCommonLinksType;
  meta: TCommonMetaType;
};

export type TFetchQuizCategoriesQueryTransformReturnType = {
  data: TQuizCategoryType[];
  meta: TCommonMetaType;
};

export type TEditQuizCategoryFieldType = {
  id: string;
  title: string;
  slug: string;
};

// TYPES FOR API USED TO FETCH ALL DATA WITHOUT PAGINATON
export type TQuizCategoryFetchAllType = {
  id: number;
  title: string;
};
export type TQuizCategoryListFetchAllType = {
  data: TQuizCategoryFetchAllType[];
};
