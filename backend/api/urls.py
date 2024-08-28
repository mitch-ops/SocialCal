from django.urls import path
from . import views

urlpatterns = [
    path('activities/', views.ActivityListCreateView.as_view(), name='activity-list-create'),
    path('activities/<int:pk>/', views.ActivityDetailView.as_view(), name='activity-detail'),
    path('friends/', views.FriendshipListCreateView.as_view(), name='friendship-list-create'),
    path('friends/<int:pk>/', views.FriendshipDetailView.as_view(), name="friendship-detail"),
    path('friend-requests/', views.FriendRequestsView.as_view(), name='friend-requests'),
    path('friend-request/send/<int:receiver_id>/', views.SendFriendRequestView.as_view(), name='send-friend-request'),
    path('friend-request/respond/<int:pk>/', views.RespondFriendRequestView.as_view(), name='respond-friend-request'),
    path('users/<int:pk>/', views.UserProfileView.as_view(), name='user-profile'),
]