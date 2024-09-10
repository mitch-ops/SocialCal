from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Activity, Friendship, FriendRequest
from .serializers import ActivitySerializer, FriendshipSerializer, FriendRequestSerializer, UserSerializer

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
        serializer.save(user=self.request.user)
        # try:
        #     serializer.save(user=self.request.user)
        # except serializers.validationError as e:
        #     print("Validation Error:", e.detail)
        #     raise


class ActivityDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user) # gets the activity created by this user
    
class FriendshipListCreateView(generics.ListCreateAPIView):
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
    
####################################################################
##### views for sending, accpeting, and reject friend requests #####
####################################################################

# Handling the process of a friend request from one user to another
class SendFriendRequestView(generics.CreateAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *arg, **kwargs):
        # keyword arg for the api endpoint (in urls.py)
        receiver = User.objects.get(id=kwargs['receiver_id'])
        if FriendRequest.objects.filter(sender=request.user, receiver=receiver).exists():
            return Response({"detail": "Friend request already sent."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create a friend request
        friend_request = FriendRequest(sender=request.user, receiver=receiver)
        friend_request.save()
        return Response({"detail": "Friend request sent."}, status=status.HTTP_201_CREATED)
    

class RespondFriendRequestView(generics.CreateAPIView):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    permission_classes = (IsAuthenticated,)

    def put(self, request, *arg, **kwargs):
        # Fetch friend request based on the pk from the api endpoint
        friend_request = self.get_object()
        # Check if the logged in user (request.user) is the receiver of the friend request
        if friend_request.receiver != request.user:
            return Response({"detail": "Not allowed."}, status=status.HTTP_403_FORBIDDEN)
        
        # Retrieves the action field in the http request body
        action = request.data.get('action')
        if action == "accept":
            friend_request.accept()
            return Response({"detail": "Friend request accepted."})
        elif action == "reject":
            friend_request.reject()
            return Response({"detail": "Friend request rejected."})
        return Response({"detail": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)
    
# Add user profile view to retrieve a user by profile id
class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

# Add a user search view for the searfh feature for sending friend requests
class UserSearchView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        username = self.request.query_params.get('username', None)
        if username:
            return User.objects.filter(username=username)
        return User.objects.none()


# Add a Friend-requests view to list the friend requests
# Need to get queryset wher ethe current uer is the receiver and us ListAPIView
# since we want to retrieve a list of friend requests
# filter the friend requests to return only those where the logged-in user is the receiver
class FriendRequestsView(generics.ListAPIView):
    serializer_class = FriendRequestSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return FriendRequest.objects.filter(receiver=self.request.user)

# View to get the current logged-in user's profile
class CurrentUserProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
        })