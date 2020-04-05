import json

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from listings.models import Listing
from transactions.models import Transaction
from transactions.serializers import TransactionSerializer


class GetTransactionView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        transaction = Transaction.objects.get_transaction(pk)
        json_content = json.dumps(transaction, cls=DjangoJSONEncoder)

        return HttpResponse(json_content, content_type="application/json")


class CreateTransactionView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (JSONParser, MultiPartParser)
    serializer_class = TransactionSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # check if there's enough stock
        listing_id = serializer.validated_data['listing'].id
        requested_count = serializer.validated_data['count']
        listing = Listing.objects.get(pk=listing_id)
        actual_count = listing.count

        if requested_count > actual_count:
            return Response({"create_transaction": "failed",
                             "requested_count": requested_count,
                             "actual_count": listing.count}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        listing.count -= requested_count
        listing.save()

        return Response({"create_transaction": "success"}, status=status.HTTP_201_CREATED)


class GetBuyerTransactionsView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, buyer_id):
        transactions = Transaction.objects.buyer_transactions(buyer_id)
        json_content = json.dumps(list(transactions), cls=DjangoJSONEncoder)

        return HttpResponse(json_content, content_type="application/json")

class GetSellerTransactionsView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, seller_id):
        transactions = Transaction.objects.seller_transactions(seller_id)
        json_content = json.dumps(list(transactions), cls=DjangoJSONEncoder)

        return HttpResponse(json_content, content_type="application/json")