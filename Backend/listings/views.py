import json

from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework import status
from rest_framework.mixins import UpdateModelMixin
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Listing
from .serializers import ListingSerializer


class GetListingView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        listing = Listing.objects.get_listing(pk)
        json_content = json.dumps(listing, cls=DjangoJSONEncoder)

        return HttpResponse(json_content, content_type="application/json")

# returns list of listings with count > 0, ordered by time created, newest first
class GetAllActiveListingsView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        listings = Listing.objects.active_listings()
        json_content = json.dumps(list(listings), cls=DjangoJSONEncoder)

        return HttpResponse(json_content, content_type="application/json")


# returns list of listings filtered by seller_id/user_id, ordered by time created, newest first
class GetSellerListingsView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, seller_id):
        listings = Listing.objects.seller_listings(seller_id)
        json_content = json.dumps(list(listings), cls=DjangoJSONEncoder)

        return HttpResponse(json_content, content_type="application/json")


class CreateListingView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (JSONParser, MultiPartParser)
    serializer_class = ListingSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"create_listing": "success"}, status=status.HTTP_201_CREATED)


class UpdateListingView(generics.GenericAPIView, UpdateModelMixin):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = (IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        self.partial_update(request, *args, **kwargs)

        return Response({"update-listing": "success"})


class DeleteListingView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, pk):
        listing = get_object_or_404(Listing, pk=pk)
        listing.delete()

        return Response({"delete_listing": "success"})
