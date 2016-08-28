# -*- coding: utf-8 -*-

import json

import tools
from exceptions import GameError


def command(func):
    def wrapper(self, data):
        result = func(self, **data)
        self.send_ok(data=result)
    return wrapper


class CommandHandler:
    def __init__(self, game, ws):
        self.game = game
        self.ws = ws
        self.commands = [
            'enter',
        ]
        self.user = None

    async def process(self, msg):
        tools.debug(msg.data)
        msg_data = json.loads(msg.data)

        command_name = msg_data.get('command')
        if command_name in self.commands:
            command_method = getattr(self, command_name)
            command_method(msg_data)
        elif self.user and command_name in self.user.get_commands():
            self.user.set_command(msg_data)
        else:
            raise GameError('unknown command')

    def send(self, response):
        try:
            self.ws.send_str(json.dumps(response))
        except RuntimeError:
            self.closed()

    def send_ok(self, data=None):
        response = {'type': 'response'}
        if data:
            response['data'] = data
        self.send(response)

    def push(self, data):
        self.send({'type': 'perspective', 'data': data})

    @command
    def enter(self, user_name, **kwargs):
        self.user = self.game.login(user_name)  # TODO: add session
        self.game.enter(user_name)
        self.user.push_callback = self.push

    def closed(self):
        if self.user:
            self.game.leave(self.user.user_name)
            self.game.logout(self.user.user_name)
            self.user.push_callback = None
            self.user = None
