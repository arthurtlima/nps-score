from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid

from app.core.database import get_db
from app.core.logging import get_logger
from app.models.response import Response
from app.schemas.response import Response as ResponseSchema, ResponseCreate
from app.repositories import CompanyRepository, ResponseRepository

router = APIRouter()
logger = get_logger(__name__)


def validate_uuid(id_value: str, id_type: str = "ID") -> str:
    try:
        uuid.UUID(id_value)
        return id_value
    except ValueError:
        logger.error(f"Invalid {id_type} UUID format", id_value=id_value)
        raise HTTPException(status_code=400, detail=f"Invalid {id_type} format")


@router.get("/companies/{company_id}/responses", response_model=List[ResponseSchema])
def get_company_responses(company_id: str, db: Session = Depends(get_db)):
    validated_company_id = validate_uuid(company_id, "company ID")
    logger.info("Fetching responses for company", company_id=validated_company_id)

    company_repo = CompanyRepository(db)
    response_repo = ResponseRepository(db)

    company = company_repo.get_by_id(validated_company_id)
    if not company:
        logger.warning(
            "Company not found for responses fetch", company_id=validated_company_id
        )
        raise HTTPException(status_code=404, detail="Company not found")

    responses = response_repo.get_by_company_id(validated_company_id)
    logger.info(
        "Responses fetched successfully",
        company_id=validated_company_id,
        count=len(responses),
    )
    return responses


@router.post("/companies/{company_id}/responses", response_model=ResponseSchema)
def create_response(
    company_id: str, response: ResponseCreate, db: Session = Depends(get_db)
):
    validated_company_id = validate_uuid(company_id, "company ID")
    logger.info(
        "Creating response for company",
        company_id=validated_company_id,
        rating=response.rating,
    )

    company_repo = CompanyRepository(db)
    response_repo = ResponseRepository(db)

    company = company_repo.get_by_id(validated_company_id)
    if not company:
        logger.warning(
            "Company not found for response creation", company_id=validated_company_id
        )
        raise HTTPException(status_code=404, detail="Company not found")

    if response.rating < 0 or response.rating > 5:
        logger.error(
            "Invalid rating provided",
            rating=response.rating,
            company_id=validated_company_id,
        )
        raise HTTPException(status_code=400, detail="Rating must be between 0 and 5")

    db_response = Response(
        id=str(uuid.uuid4()),
        company_id=validated_company_id,
        rating=response.rating,
        comment=response.comment,
    )

    result = response_repo.create(db_response)
    logger.info(
        "Response created successfully",
        response_id=result.id,
        company_id=validated_company_id,
    )
    return result


@router.delete("/responses/{response_id}")
def delete_response(response_id: str, db: Session = Depends(get_db)):
    validated_response_id = validate_uuid(response_id, "response ID")
    logger.info("Deleting response", response_id=validated_response_id)

    response_repo = ResponseRepository(db)
    db_response = response_repo.get_by_id(validated_response_id)

    if not db_response:
        logger.warning(
            "Response not found for deletion", response_id=validated_response_id
        )
        raise HTTPException(status_code=404, detail="Response not found")

    response_repo.delete(db_response)
    logger.info("Response deleted successfully", response_id=validated_response_id)
    return {"message": "Response deleted"}
