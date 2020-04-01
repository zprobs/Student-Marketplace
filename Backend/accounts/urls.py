from django.urls import path, include

from knox.views import LogoutView

from .views import UserView, RegisterView, LoginView, ActivateView

urlpatterns = [
    path('', include('knox.urls')),
    path('user', UserView.as_view(), name='user'),
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='knox_logout'),
    path('activate/<int:pk>/<slug:token>/', ActivateView.as_view(), name='activate')
]