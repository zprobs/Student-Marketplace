from django.db import models

from accounts.models import User
from listings.models import Listing


class TransactionManager(models.Manager):
    def get_transaction(self, pk):
        transactions = Transaction.objects.values('id', 'address', 'count', 'created_at', 'listing_id', 'listing__img',
                                                  'listing__info', 'listing__title', 'listing__price',
                                                  'listing__seller_id', 'listing__seller__first_name',
                                                  'listing__seller__last_name', 'listing__seller__email',
                                                  'listing__seller__phone', 'buyer_id', 'buyer__first_name',
                                                  'buyer__last_name', 'buyer__email', 'buyer__phone')
        transaction = transactions.get(pk=pk)

        return transaction

    def buyer_transactions(self, buyer_id):
        transactions = Transaction.objects.filter(buyer_id=buyer_id).values('id', 'address', 'count', 'created_at',
                                                                            'listing_id', 'listing__img',
                                                                            'listing__info', 'listing__title',
                                                                            'listing__price', 'listing__seller_id',
                                                                            'listing__seller__first_name',
                                                                            'listing__seller__last_name',
                                                                            'listing__seller__email',
                                                                            'listing__seller__phone', 'buyer_id')
        transactions.order_by('created_at').reverse()

        return transactions

    def seller_transactions(self, seller_id):
        transactions = Transaction.objects.filter(listing__seller_id=seller_id).values('id', 'address', 'count',
                                                                                       'created_at', 'listing_id',
                                                                                       'listing__img', 'listing__info',
                                                                                       'listing__title',
                                                                                       'listing__price', 'buyer_id',
                                                                                       'buyer__first_name',
                                                                                       'buyer__last_name',
                                                                                       'buyer__email', 'buyer__phone',
                                                                                       'listing__seller_id')
        transactions.order_by('created_at').reverse()

        return transactions


class Transaction(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='listings')
    address = models.TextField()
    count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    objects = TransactionManager()

    class Meta:
        db_table = "transactions"
