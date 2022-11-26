from os import environ, path
from dotenv import load_dotenv

base_dir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(base_dir, '.env'))

class Config:

    ''' Set Flask Configuration from environment varibles'''
    FLASK_APP = 'wsgi.py'
    FLASK_ENV = environ.get('FLASK_ENV')
    SECRET_KEY = environ.get('SECRET_KEY')

    # Flask Assets
    LESS_BIN = environ.get('LESS_BIN')
    ASSETS_DEBUG = environ.get('ASSETS_DEBUG')
    LESS_RUN_IN_DEBUG = environ.get('LESS_RUB_IN_DEBUG')

    # Static Assets
    STATIC_FOLDER = 'static'
    TEMPLATES_FOLDER = 'templates'
    COMPRESSION_DEBUG = environ.get("COMPRESSION_DEBUG")

    # SQLAlchemy
    SQLALCHEMY_DATABASE_URI = environ.get('SQLALCHEMY_DATABASE_URI')
    SQL_ALCHEMY = False
    SQL_ALCHEMY_TRACK_NOTIFICATIONS = False

    # NFT STORAGE
    NFT_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEZBNGQ2NzQ1OTg4RjMwODRBQzZjMmVkOUIxQ2Y2YjUyMTY0ODAzMWMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NzE3ODczNTUwNiwibmFtZSI6IlByb29mQ29udHJhY3RzIn0.WmogMMHTgrDpau1LW4tLUw_dzxEcg7T-IZWChy5IQzw"
    NFT_URL="https://api.nft.storage"
    