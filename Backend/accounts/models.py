from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db import models


# Custom user manager
class UserManager(BaseUserManager):
    def create_user(self, email, password, first_name, last_name, school, address, phone):
        if not email:
            raise ValueError('User must have email.')
        if not password:
            raise ValueError('User must have password.')
        if not first_name:
            raise ValueError('User must have first name.')
        if not last_name:
            raise ValueError('User must have last name.')
        if not school:
            raise ValueError('User must have school.')
        if not address:
            raise ValueError('User must have address.')
        if not phone:
            raise ValueError('User must have phone.')

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            school=school,
            address=address,
            phone=phone
        )
        user.set_password(password)
        user.save()

        return user

    # Create superuser
    def create_superuser(self, email, password):
        user = self.create_user(email, password, 'admin', 'admin', 'admin', 'admin', 'admin')
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


# Custom user model
class User(AbstractBaseUser):
    email = models.EmailField(verbose_name='email', max_length=255, unique=True)
    first_name = models.TextField(verbose_name='first name')
    last_name = models.TextField(verbose_name='last name')
    school = models.TextField(verbose_name='school')
    address = models.TextField(verbose_name='address')
    phone = models.TextField(verbose_name='phone')

    # Below won't really be used by our project
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # set email = username
    USERNAME_FIELD = 'email'

    # UserManager manages User
    objects = UserManager()

    def __str__(self):
        return self.email

    class Meta:
        db_table = "accounts"
