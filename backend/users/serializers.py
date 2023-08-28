from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authentication import authenticate
from posts.serializers import PostsSerializer
from .models import CustomUser, Profile

UserModel = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class ProfileAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('avatar',)

class UserSerializer(serializers.ModelSerializer):
    """ДЛЯ СЕРИАЛИЗАЦИИ СПИСКА ПОЛЬЗОВАТЕЛЕЙ ВМЕСТЕ С ПРОФИЛЯМИ И ПРИВЯЗАННЫМИ К НИМ ПОСТАМИ"""
    posts = PostsSerializer(many=True, read_only=True)
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = UserModel
        fields = ['username', 'email', 'posts', 'profile']


class CustomUserSerializer(serializers.ModelSerializer):
    """ДЛЯ СЕРИАЛИЗАЦИИ СПИСКА ПОЛЬЗОВАТЕЛЕЙ С АВАТАРКОЙ"""
    profile = ProfileAvatarSerializer(read_only=True)

    class Meta:
        model = UserModel
        fields = ("id", "username", "profile")


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)

    class Meta:
        model = UserModel
        # fields попадают в request, id автозаполнение, пароль не отобразится в serializer.data
        fields = ['id', 'email', 'username', 'password']

    def create(self, clean_data):
        """Функция create нужна для правильного хэширования пароля.Без нее новый пользователь
        все равно будет создан, но пароль не будет нормально захэширован"""
        return UserModel.objects.create_user(**clean_data)


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")



