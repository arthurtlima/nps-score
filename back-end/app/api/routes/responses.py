from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.core.database import get_db
from app.models.response import Response
from app.models.company import Company
from app.schemas.response import Response as ResponseSchema, ResponseCreate

router = APIRouter()

@router.get("/companies/{company_id}/responses", response_model=List[ResponseSchema])
def get_company_responses(company_id: str, db: Session = Depends(get_db)):
   
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    
    responses = db.query(Response).filter(Response.company_id == company_id).all()
    return responses

@router.post("/companies/{company_id}/responses", response_model=ResponseSchema)
def create_response(company_id: str, response: ResponseCreate, db: Session = Depends(get_db)):
  
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    
    if response.rating < 0 or response.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 0 and 5")
    
    db_response = Response(
        id=str(uuid.uuid4()),
        company_id=company_id,
        rating=response.rating,
        comment=response.comment
    )
    db.add(db_response)
    db.commit()
    db.refresh(db_response)
    return db_response

@router.delete("/responses/{response_id}")
def delete_response(response_id: str, db: Session = Depends(get_db)):
    db_response = db.query(Response).filter(Response.id == response_id).first()
    if not db_response:
        raise HTTPException(status_code=404, detail="Response not found")
    
    db.delete(db_response)
    db.commit()
    return {"message": "Response deleted"}
