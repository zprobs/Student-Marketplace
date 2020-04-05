from django.urls import path
from .views import *

urlpatterns = [
    path('create', CreateTransactionView.as_view()),
    path('get/buyer/<int:buyer_id>/', GetBuyerTransactionsView.as_view()),
    path('get/seller/<int:seller_id>/', GetSellerTransactionsView.as_view()),
    path('get/<int:pk>/', GetTransactionView.as_view())
]