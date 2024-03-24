"""deleted survey table

Revision ID: c2c27ddcdecc
Revises: 1a4a282ec606
Create Date: 2024-03-21 00:26:18.023918

"""
from typing import Sequence, Union

import sqlalchemy as sa
import sqlmodel
from alembic import op
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = "c2c27ddcdecc"
down_revision: Union[str, None] = "1a4a282ec606"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint("question_ibfk_1", "question", type_="foreignkey")
    op.drop_column("question", "survey_id")
    op.drop_table("survey")
    op.add_column(
        "question",
        sa.Column("user_id", sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    )
    op.create_foreign_key(None, "question", "user", ["user_id"], ["user_id"])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "question",
        sa.Column(
            "survey_id",
            mysql.INTEGER(display_width=11),
            autoincrement=False,
            nullable=True,
        ),
    )
    op.drop_constraint(None, "question", type_="foreignkey")
    op.create_foreign_key(
        "question_ibfk_1", "question", "survey", ["survey_id"], ["id"]
    )
    op.drop_column("question", "user_id")
    op.create_table(
        "survey",
        sa.Column(
            "id", mysql.INTEGER(display_width=11), autoincrement=True, nullable=False
        ),
        sa.Column(
            "service_id",
            mysql.INTEGER(display_width=11),
            autoincrement=False,
            nullable=False,
        ),
        sa.ForeignKeyConstraint(["service_id"], ["service.id"], name="survey_ibfk_1"),
        sa.PrimaryKeyConstraint("id"),
        mysql_collate="utf8mb4_general_ci",
        mysql_default_charset="utf8mb4",
        mysql_engine="InnoDB",
    )
    # ### end Alembic commands ###
