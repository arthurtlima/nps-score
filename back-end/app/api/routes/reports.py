from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.core.database import get_db
from app.models.company import Company
from app.models.response import Response
from app.services.nps_service import NpsService

router = APIRouter()

@router.get("/nps")
def get_nps_reports(db: Session = Depends(get_db)) -> List[Dict[str, Any]]:
    companies = db.query(Company).all()
    reports = []
    
    for company in companies:
        responses = db.query(Response).filter(Response.company_id == company.id).all()
        nps_data = NpsService.calculate_nps(responses)
        
        reports.append({
            "id": company.id,
            "name": company.name,
            **nps_data
        })
    
    return reports

@router.get("/nps/{company_id}")
def get_company_nps_report(company_id: str, db: Session = Depends(get_db)) -> Dict[str, Any]:
    company = db.query(Company).filter(Company.id == company_id).first()
    if not company:
        raise HTTPException(status_code=404, detail="Company not found")
    
    return NpsService.get_company_nps(db, company_id)
