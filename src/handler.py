# -*- coding: utf-8 -*-

import json

import tools
from exceptions import GameError


def command(func):
    async def wrapper(self, data):
        result = await func(self, **data)
        self.send_ok(data=result)
    return wrapper


class CommandHandler:
    def __init__(self, game, ws):
        self.game = game
        self.ws = ws
        self.commands = [
            'close',
            'enter',
        ]
        self.user = None

    async def process(self, msg):
        tools.debug(msg.data)
        msg_data = json.loads(msg.data)

        command_name = msg_data.get('command')
        if command_name in self.commands:
            command_method = getattr(self, command_name)
            await command_method(msg_data)
        elif self.user and command_name in self.user.get_commands():
            self.process_user_command(command_name, msg_data)
        else:
            raise GameError('unknown command')

    def process_user_command(self, command_name, msg_data):
        command_method = getattr(self.user, command_name)
        result = command_method(msg_data)
        self.send_ok(data=result)

    def send(self, response):
        self.ws.send_str(json.dumps(response))

    def send_ok(self, data=None):
        response = {'type': 'response'}
        if data:
            response['data'] = data
        self.send(response)

    def push(self, data):
        self.send({'type': 'perspective', 'data': data})

    async def close(self, data):
        await self.ws.close()

    @command
    async def enter(self, user_name, **kwargs):
        self.user = self.game.login(user_name)  # TODO: add session
        self.game.enter(user_name)
        self.user.push_callback = self.push
