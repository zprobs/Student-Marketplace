from django.db import models

from accounts.models import User


class Listing(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listing')
    title = models.TextField()
    info = models.TextField()
    img = models.ImageField()
    price = models.FloatField()
    count = models.IntegerField()
    is_active = models.BooleanField()
    location = models.TextField()

    class Meta:
        db_table = "listings"
