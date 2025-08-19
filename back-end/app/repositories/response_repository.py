from sqlalchemy.orm import Session
from app.models.response import Response
from typing import List, Optional


class ResponseRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_company_id(self, company_id: str) -> List[Response]:
        return self.db.query(Response).filter(Response.company_id == company_id).all()

    def get_by_id(self, response_id: str) -> Optional[Response]:
        return self.db.query(Response).filter(Response.id == response_id).first()

    def create(self, response: Response) -> Response:
        self.db.add(response)
        self.db.commit()
        self.db.refresh(response)
        return response

    def delete(self, response: Response):
        self.db.delete(response)
        self.db.commit()
