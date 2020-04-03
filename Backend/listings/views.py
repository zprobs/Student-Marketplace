from rest_framework import generics
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.response import Response
from rest_framework import status

from .serializers import ListingSerializer


class CreateListingView(generics.GenericAPIView):
    parser_classes = (JSONParser, MultiPartParser)
    serializer_class = ListingSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"listing": "success"}, status=status.HTTP_201_CREATED)
