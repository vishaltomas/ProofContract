from flask_sqlalchemy import SQLAlchemy
from flask import current_app
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from . import SQLdb



class User(UserMixin, SQLdb.Model):
    '''user account model'''

    __tablename__ = "user"

    id = SQLdb.Column(
        SQLdb.Integer,
        primary_key = True
    )

    name = SQLdb.Column(
        SQLdb.String(100),
        nullable = False
    )

    username = SQLdb.Column(
        SQLdb.String(100),
        nullable = False,
        unique = False
    )

    email =  SQLdb.Column(
        SQLdb.String(100),
        unique = True,
        nullable = False
    )

    password = SQLdb.Column(
        SQLdb.String(100),
        nullable = False
    )

    created_on = SQLdb.Column(
        SQLdb.DateTime,
        index = False,
        nullable = False,
        unique = False
    )

    last_login = SQLdb.Column(
        SQLdb.DateTime,
        index = False,
        nullable = True,
        unique = False
    )

    # set password as hash of it
    def set_password(self, password):
        # create hashed password
        self.password = generate_password_hash(
            password,
            method = 'sha256'
        )

    def check_password(self, password):
        # check hashed password
        return check_password_hash(
            self.password,
            password
        )


class Document(SQLdb.Model):
    """Document upload"""

    __tablename__ = "document"

    id = SQLdb.Column(
        SQLdb.String(100),
        primary_key=True
    )
    docname = SQLdb.Column(
        SQLdb.String(100),
        nullable=False
    )

    created_by = SQLdb.Column(
        SQLdb.String(100),
        nullable=False
    )

    created_date = SQLdb.Column(
        SQLdb.DateTime,
        nullable=False,
        index=False,
        unique=False
    )

    document_file_name = SQLdb.Column(
        SQLdb.String(100),
        nullable=False
    )

    IPFS_status = SQLdb.Column(
        SQLdb.Boolean,
        nullable=False
    )

    IPFS_cid = SQLdb.Column(
        SQLdb.String(32),
        nullable=False
    )

    file_hash = SQLdb.Column(
        SQLdb.String(32),
        nullable=False
    )

class Transactions(SQLdb.Model):

    __tablename__ = "transactions"

    id = SQLdb.Column(
        SQLdb.Integer,
        nullable=False,
        primary_key=True,
        index=False
    )

    # file_hash = SQLdb.Column(

    # )

    file_id = SQLdb.Column(
        SQLdb.Integer,
        SQLdb.ForeignKey(
            "document.id"
        )
    )

    created_date = SQLdb.Column(
        SQLdb.DateTime,
        nullable=False
    )

    created_by = SQLdb.Column(
        SQLdb.DateTime,
        nullable=False
    )

    msg_hash = SQLdb.Column(
        SQLdb.String(32),
        nullable=False
    )

    signee = SQLdb.Column(
        SQLdb.Integer,
        SQLdb.ForeignKey(
            "user.id"
        )
    )