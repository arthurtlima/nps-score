import pytest


def test_create_response(client):
    company_response = client.post("/api/companies/", json={"name": "Test Company"})
    company_id = company_response.json()["id"]

    response = client.post(
        f"/api/companies/{company_id}/responses",
        json={"rating": 5, "comment": "Excellent service!"},
    )

    assert response.status_code == 200
    data = response.json()
    assert data["rating"] == 5
    assert data["comment"] == "Excellent service!"
    assert data["company_id"] == company_id


def test_get_company_responses(client):
    company_response = client.post("/api/companies/", json={"name": "Test Company"})
    company_id = company_response.json()["id"]

    client.post(f"/api/companies/{company_id}/responses", json={"rating": 5})
    client.post(f"/api/companies/{company_id}/responses", json={"rating": 3})

    response = client.get(f"/api/companies/{company_id}/responses")

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


def test_invalid_rating(client):
    company_response = client.post("/api/companies/", json={"name": "Test Company"})
    company_id = company_response.json()["id"]

    response = client.post(
        f"/api/companies/{company_id}/responses", json={"rating": 10}
    )

    assert response.status_code == 422
    error_detail = response.json()["detail"]
    assert any("rating" in str(error).lower() for error in error_detail)


def test_company_not_found(client):
    fake_uuid = "550e8400-e29b-41d4-a716-446655440000"

    response = client.post(f"/api/companies/{fake_uuid}/responses", json={"rating": 5})

    assert response.status_code == 404
    assert "Company not found" in response.json()["detail"]
