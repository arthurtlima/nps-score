"""Add cascade delete to responses

Revision ID: dfe56957baa2
Revises: 1b7050c269b2
Create Date: 2025-08-18 15:37:27.472747

"""
from alembic import op
import sqlalchemy as sa

revision = 'dfe56957baa2'  
down_revision = '1b7050c269b2' 
branch_labels = None
depends_on = None

def upgrade():
    op.drop_constraint('responses_company_id_fkey', 'responses', type_='foreignkey')
    
    op.create_foreign_key(
        'responses_company_id_fkey', 
        'responses', 
        'companies',
        ['company_id'], 
        ['id'], 
        ondelete='CASCADE'
    )

def downgrade():
    op.drop_constraint('responses_company_id_fkey', 'responses', type_='foreignkey')
    op.create_foreign_key(
        'responses_company_id_fkey', 
        'responses', 
        'companies',
        ['company_id'], 
        ['id']
    )
