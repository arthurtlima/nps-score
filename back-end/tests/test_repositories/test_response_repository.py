import pytest
from app.repositories.response_repository import ResponseRepository
from app.repositories.company_repository import CompanyRepository
from app.models.response import Response
from app.models.company import Company


def test_create_response(db_session):
    # Setup company first
    company_repo = CompanyRepository(db_session)
    company = Company(id="company-1", name="Test Company")
    company_repo.create(company)

    # Test response creation
    response_repo = ResponseRepository(db_session)
    response = Response(
        id="response-1", company_id="company-1", rating=5, comment="Great!"
    )

    result = response_repo.create(response)

    assert result.id == "response-1"
    assert result.rating == 5
    assert result.comment == "Great!"


def test_get_responses_by_company_id(db_session):
    # Setup
    company_repo = CompanyRepository(db_session)
    response_repo = ResponseRepository(db_session)

    company = Company(id="company-1", name="Test Company")
    company_repo.create(company)

    response1 = Response(id="response-1", company_id="company-1", rating=5)
    response2 = Response(id="response-2", company_id="company-1", rating=3)

    response_repo.create(response1)
    response_repo.create(response2)

    # Test
    results = response_repo.get_by_company_id("company-1")

    assert len(results) == 2
    assert all(r.company_id == "company-1" for r in results)
