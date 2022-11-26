from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, Length, Optional

class SignUpForm(FlaskForm):
    '''user sign-up form'''
    name = StringField(
        'Name',
        validators = [DataRequired()]
    )

    username = StringField(
        "User Name",
        validators=[DataRequired(), Length(min=4)]
    )

    email = StringField(
        'Email',
        vaildators = [Length(min=6), Email(message="Enter a Valid mail"), DataRequired()]
    )

    password = PasswordField(
        "Password",
        validators = [DataRequired(), Length(min=6, message = "Enter a Strong password")]
    )

    confirmPassword = PasswordField(
        "Confirm your password",
        validators=[DataRequired(), EqualTo('password', message ="passwords must be match")]
    )

    submit = SubmitField('Register')

class LoginForm(FlaskForm):
    "User Login form"
    email = StringField(
        "Email",
        validators=[Email(message = "Enter a valid message")]
    )

    username = StringField(
        "User Name",
    )

    assert(email != "" and username != "")

    password = PasswordField(
        "password",
        validators = [DataRequired()]
    )

    submit = SubmitField("Login")

class CreateDocForm(FlaskForm):
    '''
    To create new section for signing the document
    '''
    class Meta:
        csrf = False
    docname = StringField(
        "DocumentName",
        validators = [DataRequired(), Length(min=3)]
    )
    document = FileField(
        validators = [FileRequired()]
    )
    