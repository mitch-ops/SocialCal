from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
# Need view or path to create this user
# For the registration and login

# Make class based view (implements creating a new user a.k.a registration)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,) # Allow anyone to create a new user
    serializer_class = RegisterSerializer # Tells the view what data we need

# Obtains token pair for a custom token
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
