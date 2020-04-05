from django.urls import path
from .views import *

urlpatterns = [
    path('create', CreateListingView.as_view()),
    path('get/<int:pk>/', GetListingView.as_view()),
    path('update/<int:pk>/', UpdateListingView.as_view()),
    path('remove/<int:pk>/', RemoveListingView.as_view()),
    path('get/active', GetAllActiveListingsView.as_view()),
    path('get/seller/<int:seller_id>/', GetSellerListingsView.as_view())
]