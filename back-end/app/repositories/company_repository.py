from sqlalchemy.orm import Session
from app.models.company import Company
from typing import List, Optional


class CompanyRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[Company]:
        return self.db.query(Company).all()

    def get_by_id(self, company_id: str) -> Optional[Company]:
        return self.db.query(Company).filter(Company.id == company_id).first()

    def create(self, company: Company) -> Company:
        self.db.add(company)
        self.db.commit()
        self.db.refresh(company)
        return company

    def delete(self, company: Company):
        self.db.delete(company)
        self.db.commit()
