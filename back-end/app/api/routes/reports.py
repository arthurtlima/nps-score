from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.core.database import get_db
from app.core.logging import get_logger
from app.services.nps_service import NpsService
from app.repositories import CompanyRepository, ResponseRepository

router = APIRouter()
logger = get_logger(__name__)

@router.get("/nps")
def get_nps_reports(db: Session = Depends(get_db)) -> List[Dict[str, Any]]:
    logger.info("Fetching NPS reports for all companies")
    
    company_repo = CompanyRepository(db)
    response_repo = ResponseRepository(db)
    
    companies = company_repo.get_all()
    reports = []
    
    for company in companies:
        responses = response_repo.get_by_company_id(company.id)
        nps_data = NpsService.calculate_nps(responses)
        
        reports.append({
            "id": company.id,
            "name": company.name,
            **nps_data
        })
    
    logger.info("NPS reports generated successfully", companies_count=len(companies))
    return reports

@router.get("/nps/{company_id}")
def get_company_nps_report(company_id: str, db: Session = Depends(get_db)) -> Dict[str, Any]:
    logger.info("Fetching NPS report for company", company_id=company_id)
    
    company_repo = CompanyRepository(db)
    company = company_repo.get_by_id(company_id)
    if not company:
        logger.warning("Company not found for NPS report", company_id=company_id)
        raise HTTPException(status_code=404, detail="Company not found")
    
    nps_data = NpsService.get_company_nps(db, company_id)
    logger.info("NPS report generated successfully", company_id=company_id, nps=nps_data.get("nps"))
    return nps_data
