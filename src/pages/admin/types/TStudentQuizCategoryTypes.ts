export type AddQuizCategoryFieldType = {
  id: string;
  title: string;
  slug: string;
};

export type StudentQuizCategoryType = {
  id: string;
  title: string;
  slug: string;
};

export type TStudentAllQuizCategoryType = {
  id: number;
  title: string;
  categories: string;
};

export type TAllStudentQuizCategoriesType = {
  data: TStudentAllQuizCategoryType[];
};
