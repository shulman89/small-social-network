from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile

User = get_user_model()

'''Приемник create_profile срабатывает, когда генерируется сигнал post_save для модели пользователя,
 т. е. после того, как модель пользователя была сохранена в базе данных, модель пользователя генерирует 
 сигнал post_save, и срабатывает приемник create_profile'''


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        print('Профиль создан')


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
    print('Профиль сoхранен')
