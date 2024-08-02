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