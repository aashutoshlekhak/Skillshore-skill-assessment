export type TCommonMetaType = {
  current_page: number;
  from: number;
  last_page: number;
  links: { url: string; label: string; active: boolean }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};
export type TCommonLinksType = {
  first: string;
  last: string;
  prev: string;
  next: string;
};

export type TSearchParams = {
  page: number;
  title: string;
};

export type ParamsType = {
  id: string;
};
