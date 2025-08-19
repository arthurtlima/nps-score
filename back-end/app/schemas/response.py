from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class ResponseBase(BaseModel):
    rating: int = Field(..., ge=0, le=5)
    comment: Optional[str] = None


class ResponseCreate(ResponseBase):
    pass


class Response(ResponseBase):
    id: str
    company_id: str
    created_at: datetime

    class Config:
        from_attributes = True
