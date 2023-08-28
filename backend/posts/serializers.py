from rest_framework import serializers
from .models import *

class CommentWriteSerializer(serializers.ModelSerializer):
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Comment
        fields = '__all__'


class CommentReadSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'


class PostsSerializer(serializers.ModelSerializer):
    """СЕРИАЛИЗАТОР ПОСТОВ СО ВЛОЖЕННЫМ ОТНОШЕНИЕМ КОМЕНТАРИЕВ К НИМ"""
    comments = CommentReadSerializer(many=True, read_only=True)
    author = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'


    def get_likes(self, obj):
        likes = [like.username for like in obj.likes.get_queryset().only('username')]
        return likes


class PostReadSerializer(serializers.ModelSerializer):
    ''' SerializerMethodField- поле доступное только для чтения'''
    author = serializers.CharField(source='author.username', read_only=True)
    likes = serializers.SerializerMethodField()
    comments = CommentReadSerializer(many=True, read_only=True)
    avatar = serializers.ImageField(source='author.profile.avatar', read_only=True)


    class Meta:
        model = Post
        fields = '__all__'


    def get_likes(self, obj):
        likes = [like.email for like in obj.likes.get_queryset().only('email')]
        return likes


class PostWriteSerializer(serializers.ModelSerializer):
    '''HiddenField - значение по умолчанию'''
    author = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Post
        fields = '__all__'
