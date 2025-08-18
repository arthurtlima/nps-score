from sqlalchemy.orm import Session
from app.models.response import Response
from typing import Dict, Any

class NpsService:
    @staticmethod
    def calculate_nps(responses: list) -> Dict[str, Any]:
        total = len(responses)
        if total == 0:
            return {"nps": None, "promoters": 0, "neutrals": 0, "detractors": 0, "total": 0}
        
        promoters = sum(1 for r in responses if r.rating >= 4)
        neutrals = sum(1 for r in responses if r.rating == 3)
        detractors = sum(1 for r in responses if r.rating <= 2)
        
        nps = round(((promoters / total) * 100 - (detractors / total) * 100), 2)
        
        return {
            "nps": nps,
            "promoters": promoters,
            "neutrals": neutrals,
            "detractors": detractors,
            "total": total
        }
    
    @staticmethod
    def get_company_nps(db: Session, company_id: str) -> Dict[str, Any]:
        responses = db.query(Response).filter(Response.company_id == company_id).all()
        return NpsService.calculate_nps(responses)
