from django.db import models

from accounts.models import User


class ListingManager(models.Manager):
    def get_listing(self, pk):
        listings = Listing.objects.select_related('seller').values('id', 'title', 'info', 'img', 'price', 'count',
                                                                   'is_active', 'location', 'created_at', 'updated_at',
                                                                   'seller__id', 'seller__first_name',
                                                                   'seller__last_name', 'seller__email',
                                                                   'seller__phone')
        listing = listings.get(pk=pk)

        return listing

    def active_listings(self):
        listings = Listing.objects.filter(count__gt=0).filter(is_active=True)\
            .select_related('seller').values('id', 'title', 'info', 'img', 'price', 'count', 'is_active', 'location',
                                             'created_at', 'updated_at', 'seller__id', 'seller__first_name',
                                             'seller__last_name', 'seller__email', 'seller__phone')
        listings.order_by('created_at').reverse()

        return listings

    def seller_listings(self, seller_id):
        listings = Listing.objects.filter(seller_id=seller_id).values('id', 'title', 'info', 'img', 'price', 'count',
                                                                      'is_active', 'location', 'seller__id',
                                                                      'created_at', 'updated_at', 'seller__first_name',
                                                                      'seller__last_name', 'seller__email',
                                                                      'seller__phone')
        listings.order_by('created_at').reverse()

        return listings

class Listing(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='listing')
    title = models.TextField()
    info = models.TextField()
    img = models.ImageField()
    price = models.FloatField()
    count = models.IntegerField()
    is_active = models.BooleanField(default=True)
    location = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = ListingManager()

    class Meta:
        db_table = "listings"
