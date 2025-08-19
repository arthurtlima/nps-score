import pytest
from app.services.nps_service import NpsService
from app.models.response import Response

def test_calculate_nps_with_responses():
    responses = [
        Response(id="1", company_id="c1", rating=5),  # Promoter
        Response(id="2", company_id="c1", rating=4),  # Promoter  
        Response(id="3", company_id="c1", rating=3),  # Neutral
        Response(id="4", company_id="c1", rating=2),  # Detractor
        Response(id="5", company_id="c1", rating=1),  # Detractor
    ]
    
    result = NpsService.calculate_nps(responses)
    
    assert result["total"] == 5
    assert result["promoters"] == 2
    assert result["neutrals"] == 1
    assert result["detractors"] == 2
    assert result["nps"] == 0.0  # (40% - 40%) = 0%

def test_calculate_nps_empty_responses():
    result = NpsService.calculate_nps([])
    
    assert result["nps"] is None
    assert result["total"] == 0
    assert result["promoters"] == 0
    assert result["neutrals"] == 0
    assert result["detractors"] == 0

def test_calculate_nps_all_promoters():
    responses = [
        Response(id="1", company_id="c1", rating=5),
        Response(id="2", company_id="c1", rating=4),
    ]
    
    result = NpsService.calculate_nps(responses)
    
    assert result["nps"] == 100.0
    assert result["promoters"] == 2
    assert result["detractors"] == 0
