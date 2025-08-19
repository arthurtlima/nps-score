import pytest
from app.repositories.company_repository import CompanyRepository
from app.models.company import Company


def test_create_company(db_session):
    repo = CompanyRepository(db_session)
    company = Company(id="test-id", name="Test Company")

    result = repo.create(company)

    assert result.id == "test-id"
    assert result.name == "Test Company"


def test_get_company_by_id(db_session):
    repo = CompanyRepository(db_session)
    company = Company(id="test-id", name="Test Company")
    repo.create(company)

    result = repo.get_by_id("test-id")

    assert result is not None
    assert result.name == "Test Company"


def test_get_all_companies(db_session):
    repo = CompanyRepository(db_session)
    company1 = Company(id="test-id-1", name="Company 1")
    company2 = Company(id="test-id-2", name="Company 2")

    repo.create(company1)
    repo.create(company2)

    result = repo.get_all()

    assert len(result) == 2
