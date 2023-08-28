from django.shortcuts import render, get_object_or_404
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,GenericAPIView
from .models import *
from .serializers import *
from .permissions import IsAuthorOrReadOnly
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser


class GetUsersOwnPosts(GenericAPIView):
    """Показываем только посты конкретного пользователя"""
    queryset = Post.objects.all()
    serializer_class = PostsSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        posts = Post.objects.filter(author=request.user)
        posts = self.queryset
        serializer = self.serializer_class(posts)
        print(posts.likes)
        return Response(serializer.data, *args, **kwargs)

class PostViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    # serializer_class = PostWriteSerializer
    queryset = Post.objects.all()
    parser_classes = (MultiPartParser, FormParser, JSONParser)



    def perform_create(self, serializer):
        serializer.save(pic=self.request.data.get('pic'),)

    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return PostWriteSerializer
        return PostReadSerializer

    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (IsAuthenticated,)
        elif self.action in ("update", "partial_update", "destroy"):
            self.permission_classes = (IsAuthorOrReadOnly,)
        else:
            self.permission_classes = (AllowAny,)
        return super().get_permissions()

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    def get_queryset(self):
        res = super().get_queryset()
        post_id = self.kwargs.get("post_id")
        return res.filter(post__id=post_id)
    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update", "destroy"):
            return CommentWriteSerializer
        return CommentReadSerializer
    def get_permissions(self):
        if self.action in ("create",):
            self.permission_classes = (permissions.IsAuthenticated,)
        elif self.action in ("update", "partial_update", "destroy"):
            self.permission_classes = (IsAuthorOrReadOnly,)
        else:
            self.permission_classes = (permissions.AllowAny,)
        return super().get_permissions()

class LikePostAPIView(APIView):
    """Каждый гет запрос мы либо убираем либо ставим лайк"""
    permission_classes = (permissions.IsAuthenticated,)

    def get(self,request,pk):
        user = request.user
        post = get_object_or_404(Post, pk=pk)
        if user in post.likes.all():
            post.likes.remove(user)
        else:
            post.likes.add(user)
        return Response(status=status.HTTP_200_OK)

