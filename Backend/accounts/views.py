from django.core.exceptions import SuspiciousOperation, RequestAborted
from django.shortcuts import redirect
from knox.models import AuthToken
from rest_framework import generics
from rest_framework.response import Response

from .emails import email_generator
from .models import User
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from .tokens import account_activation_token

LOGIN_URL = 'http://localhost:3000/login/'
BASE_URL = 'http://localhost:8000/auth/'
ACTIVATE = 'activate/'


class UserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class RegisterView(generics.GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        token = account_activation_token.make_token(user)
        activation_url = BASE_URL + ACTIVATE + str(user.id) + '/' + token
        email = email_generator.activation_email(user.email, activation_url)
        response = email.send()

        if response == 0:
            raise RequestAborted("Failed to send account activation email")

        return Response({
            "registration": "success"
        })


class LoginView(generics.GenericAPIView):

    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class ActivateView(generics.GenericAPIView):

    def get(self, request, pk, token):
        try:
            user = User.objects.get(pk=pk)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            return redirect(LOGIN_URL)
        else:
            raise SuspiciousOperation("Failed to activate user")
