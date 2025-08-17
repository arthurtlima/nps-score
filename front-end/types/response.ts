export interface Response {
  id: string;
  company_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface CreateResponseData {
  rating: number;
  comment?: string;
}
