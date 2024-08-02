from django.urls import path
from . import views

urlPatterns = [
    path('activities/', views.ActivityListCreateView.as_view(), name='activity-list-create'),
    path('activities/<int:pk>', views.ActivityDetailView.as_view(), name='activity-detail'),
    path('friends/', views.FriendshipListCreateView.as_view(), name='friendship-list-create'),
    path('friends/<int:pk', views.FriendshipDetailView.as_view(), name="friendship-detail"),
]