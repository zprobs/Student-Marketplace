from django.urls import path, include

from knox.views import LogoutView

from .views import UserView, RegisterView, LoginView

urlpatterns = [
    path('', include('knox.urls')),
    path('user', UserView.as_view()),
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view(), name='knox_logout')
]