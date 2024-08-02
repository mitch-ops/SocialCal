from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import Token
from .models import Activity, Friendship

# Inherit ModelSerializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # User model represents a user (it is built into django)
        model = User 
        fields = ('id', 'username', 'email', 'first_name', 'last_name')

# Serializer for registering
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')
        # Tell django we want to accept password when creating a new user, but don't want to return the password
        extra_kwargs = {'password': {'write_only': True}}

    # To create a new version of this user, accept in validated data (username and password)
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        # Set attributes
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.save()
        return user

# Need this for custom claims like username
# Also useful for displaying additional user info without extra database queries
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username # adds username claim to token payload
        return token

# Serializers for the activity and friendship models from models.py
class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = {'id', 'title', 'description', 'start_time', 'end_time', 'user'}

class FriendshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friendship
        fields = {'id', 'user', 'friend'}
