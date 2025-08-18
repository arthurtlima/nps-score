from fastapi import HTTPException, status

class CompanyNotFound(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company not found"
        )

class InvalidRating(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Rating must be between 0 and 5"
        )
