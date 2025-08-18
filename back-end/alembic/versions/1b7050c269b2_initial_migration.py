"""Initial migration

Revision ID: 1b7050c269b2
Revises: 
Create Date: 2025-08-18 13:45:58.021832

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = '1b7050c269b2'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('companies',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_companies_id'), 'companies', ['id'], unique=False)
    op.create_table('responses',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('company_id', sa.String(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('comment', sa.Text(), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.ForeignKeyConstraint(['company_id'], ['companies.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_responses_id'), 'responses', ['id'], unique=False)

def downgrade() -> None:
    op.drop_index(op.f('ix_responses_id'), table_name='responses')
    op.drop_table('responses')
    op.drop_index(op.f('ix_companies_id'), table_name='companies')
    op.drop_table('companies')
