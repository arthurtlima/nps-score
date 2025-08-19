# app/api/routes/companies.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.core.database import get_db
from app.core.logging import get_logger
from app.models.company import Company
from app.schemas.company import Company as CompanySchema, CompanyCreate, CompanyUpdate
from app.repositories import CompanyRepository

router = APIRouter()
logger = get_logger(__name__)


def validate_uuid(company_id: str) -> str:
    try:
        uuid.UUID(company_id)
        return company_id
    except ValueError:
        logger.error("Invalid UUID format", company_id=company_id)
        raise HTTPException(status_code=400, detail="Invalid company ID format")


@router.get("/", response_model=List[CompanySchema])
def get_companies(db: Session = Depends(get_db)):
    logger.info("Fetching all companies")
    repo = CompanyRepository(db)
    companies = repo.get_all()
    logger.info("Companies fetched successfully", count=len(companies))
    return companies


@router.post("/", response_model=CompanySchema)
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    logger.info("Creating new company", name=company.name)
    repo = CompanyRepository(db)
    db_company = Company(id=str(uuid.uuid4()), name=company.name)
    result = repo.create(db_company)
    logger.info("Company created successfully", company_id=result.id)
    return result


@router.put("/{company_id}", response_model=CompanySchema)
def update_company(
    company_id: str, company: CompanyUpdate, db: Session = Depends(get_db)
):
    validated_id = validate_uuid(company_id)
    logger.info("Updating company", company_id=validated_id)

    repo = CompanyRepository(db)
    db_company = repo.get_by_id(validated_id)
    if not db_company:
        logger.warning("Company not found for update", company_id=validated_id)
        raise HTTPException(status_code=404, detail="Company not found")

    db_company.name = company.name
    db.commit()
    db.refresh(db_company)
    logger.info("Company updated successfully", company_id=validated_id)
    return db_company


@router.delete("/{company_id}")
def delete_company(company_id: str, db: Session = Depends(get_db)):
    validated_id = validate_uuid(company_id)
    logger.info("Deleting company", company_id=validated_id)

    repo = CompanyRepository(db)
    db_company = repo.get_by_id(validated_id)
    if not db_company:
        logger.warning("Company not found for deletion", company_id=validated_id)
        raise HTTPException(status_code=404, detail="Company not found")

    repo.delete(db_company)
    logger.info("Company deleted successfully", company_id=validated_id)
    return {"message": "Company deleted successfully"}
