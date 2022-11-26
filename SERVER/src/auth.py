from flask import Blueprint, redirect, render_template, flash, request, session, url_for, current_app
from flask_login import login_required, logout_user, current_user, login_user
from .form import LoginForm, SignUpForm
from .db import User
from . import SQLdb, login_manager


auth_bp = Blueprint(
    "auth_bp", __name__,
    template_folder = 'templates',
    static_folder= 'static`'
)

@auth_bp.route('/signup', methods = ['GET', 'POST'])
def signup():
    '''
    User sign up form
    GET -> Sign up Page
    POST -> Do validation and user creation

    '''
    form = SignUpForm()

    if form.validate_on_submit():
        username = User.query.filter_by(username = form.username.data).first()
        email = User.query.filter_by(email = form.email.data).first()
        if username is None and email is None:
            user = User(
                name = form.name.data,
                email = form.email.data,
                username = form.email.data
            )
            user.set_password(form.password.data)
            SQLdb.session.add(user)
            SQLdb.session.commit()
            login_user(user)
            redirect(url_for('main_bp.dashboard'))
        flash("User or email already exists")

    return render_template(
        'signup.j2',
        title='Create an Account.',
        form=form,
        template='signup-page',
        body="Sign up for a user account."
    )

@auth_bp.route('/login', methods = ['GET', 'POST'])
def login():
    '''
    User sign up form
    GET -> Login Page
    POST -> Do validation and login user

    '''
    if current_user.is_authenticated:
        return redirect(url_for('main_bp.dashboard'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email = form.email.data).first()
        if user and user.check_password(password = form.password.data):
            login_user(user)
            next_page = request.args.get('next')
            return redirect(next_page or url_for('main_bp.dashboard'))
        flash('Invalid username and password')
        return redirect(url_for('auth_bp.login'))
    return render_template(
        'login.jinja2',
        form=form,
        title='Log in.',
        template='login-page',
        body="Log in with your User account."
    )


@login_manager.user_loader
def user_active(user_id):
    if user_id is not None:
        return User.query.get(user_id)
    return None

@login_manager.unauthorized_handler
def unauthorized():
    flash("You must be logged in to view the page")
    return redirect(url_for('auth_bp.login'))