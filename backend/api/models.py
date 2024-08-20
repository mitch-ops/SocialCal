from django.db import models
from django.contrib.auth.models import User

# Activity model
class Activity(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE) # who made the activity? User, data for a user
    location = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.title

# Friendship model
class Friendship(models.Model):
    user = models.ForeignKey(User, related_name='friendships', on_delete=models.CASCADE)
    friend = models.ForeignKey(User, related_name='friends', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} - {self.friend.username}"

# FriendRequest model
class FriendRequest(models.Model):
    sender = models.ForeignKey(User, related_name="sent_friend_requests", on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name="received_friend_requests", on_delete=models.CASCADE)
    timeStamp = models.DateTimeField(auto_now_add=True)
    is_accepted = models.BooleanField(default=False)

    def accept(self):
        self.is_accepted = True
        self.save()
        Friendship.objects.create(user=self.sender, friend=self.receiver)
        Friendship.objects.create(User=self.receiver, friend=self.sender)

    def reject(self):
        self.delete()
