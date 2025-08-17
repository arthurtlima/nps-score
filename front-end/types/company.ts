export interface Company {
  id: string;
  name: string;
  created_at?: string;
}

export interface CreateCompanyData {
  name: string;
}
