export interface ApiResponseProducts {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ProductItem[];
  support: {
    url: string;
    text: string;
  };
}

export interface ProductItem {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}
