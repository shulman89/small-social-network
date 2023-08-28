from django.urls import path
from rest_framework_simplejwt.views import TokenBlacklistView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import *

app_name = 'users'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path("login/", UserLoginAPIView.as_view(), name="login-user"),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path("profile/", UserProfileAPIView.as_view(), name="user-profile"),
    path("profiles/", UserProfilesView.as_view(), name="user-profiles"),
    path("profile/avatar/", UserAvatarAPIView.as_view(), name="user-avatar"),
    path("user/<str:username>", UserView.as_view(), name="user"),
    path("<str:username>", UserView.as_view(), name="user-owner"),
    path("users/", UserListView.as_view(), name="users"),
    # path("users/", ExtendedUserListView.as_view(), name="user"),

    # path(r'^/(?P<username>[0-9a-zA-Z_-]+)/posts$', UserPostList.as_view(), name='userpost-list'),
    # path(r'^/(?P<username>[0-9a-zA-Z_-]+)$', UserDetail.as_view(), name='user-detail'),
    # path(r'^$', UserList.as_view(), name='user-list'),
]
