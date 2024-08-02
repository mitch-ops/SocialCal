from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Activity, Friendship
from .serializers import ActivitySerializer, FriendshipSerializer

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

####################################
##### views for CRUD operations ####
####################################

class ActivityListCreateView(generics.ListCreateAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class ActivityDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user) # gets the activity created by this user
    
class FriendshipDetailView(generics.ListCreateAPIView):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = (IsAuthenticated,)

    def perfrom_create(self, serializer):
        serializer.save(user=self.request.user)

class FriendshipDetailView(generics.RetrieveDestroyAPIView):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classe = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)