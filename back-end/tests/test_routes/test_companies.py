import pytest
from fastapi.testclient import TestClient


def test_create_company(client):
    response = client.post("/api/companies/", json={"name": "Test Company"})

    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Test Company"
    assert "id" in data


def test_get_companies(client):
    # Create a company first
    client.post("/api/companies/", json={"name": "Test Company"})

    response = client.get("/api/companies/")

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "Test Company"
