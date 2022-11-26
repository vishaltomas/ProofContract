import os
from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy


login_manager = LoginManager()
SQLdb = SQLAlchemy()


def create_app(test_config = None):
    # create app instance and set comfig props
    app = Flask(__name__, instance_relative_config = True)
    app.config.from_mapping(
        SECRET_KEY = 'dev',
        DATABASE = os.path.join(app.instance_path, 'src.sqlite')
    )

    if test_config is None:
        #load config file if exists
        app.config.from_pyfile('config.py', silent = True)
    else:
        #load from mapping
        app.config.from_mapping(test_config)
        
    # ensure instance folder exists

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Initialize plugins

    SQLdb.init_app(app)
    login_manager.init_app(app)

    with app.app_context():
        from . import auth
        from . import routes
        # Register blueprints
        app.register_blueprint(auth.auth_bp)
        app.register_blueprint(routes.main_bp)
        # Create database models
        SQLdb.create_all()

    return app
