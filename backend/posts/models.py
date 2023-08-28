from django.db import models
from django.conf import settings


class Post(models.Model):
    ''' У поста может быть только один автор, и несколько категорий и лайки от разных пользователей'''
    pic = models.ImageField(upload_to='posts',  verbose_name='Фотография',blank=True)
    title = models.CharField(max_length=250, verbose_name='Заголовок')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts', null=True, on_delete=models.SET_NULL)
    body = models.TextField(verbose_name='Текст')
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='post_likes',blank=True)
    time_created = models.DateTimeField(auto_now_add=True)
    time_updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-time_created',)

    def __str__(self):
        return f"{self.title} by {self.author}"

class Comment(models.Model):
    '''При удалении поста удаляютсе коменты, при удалении автора, коменты остаются и привязываются к NULL'''
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='post_comments', null=True, on_delete=models.SET_NULL)
    body = models.TextField(verbose_name='Комментарий')
    time_created = models.DateTimeField(auto_now_add=True)
    time_updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('time_created',)

    def __str__(self):
        return f'{self.body[:20]} by {self.author}'



