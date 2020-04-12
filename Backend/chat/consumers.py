from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

from django.shortcuts import get_object_or_404

from accounts.models import User


class ChatConsumer(WebsocketConsumer):

    def new_message(self, data):
        user = get_object_or_404(User, pk=data['user_id'])
        message = {
            'user_email': user.email,
            'user_id': user.pk,
            'content': data['message']
        }
        content = {
            'command': 'new_message',
            'message': message
        }

        return self.send_chat_message(content)

    commands = {
        'new_message': new_message
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))
