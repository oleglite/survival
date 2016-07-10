# -*- coding: utf-8 -*-

from collections import OrderedDict

from world import World
from creature import Creature
from exceptions import GameError


class Game:
    def __init__(self):
        self.world = World()
        self.users = OrderedDict()  # because order of users may change result of turn

    def login(self, user_name):
        if user_name in self.users:
            raise GameError('User {} has already logged in'.format(user_name))
        self.users[user_name] = User(user_name)
        return self.users[user_name]

    def logout(self, user_name):
        if user_name in self.users:
            del self.users[user_name]

    def enter(self, user_name):
        user = self.users[user_name]
        if user.creature:
            raise GameError('User "{}" has already entered'.format(user_name))

        user.creature = Creature(user_name)
        start_cell = self.world.get_cell(5, 5)
        start_cell.enter(user.creature)

    def turn(self):
        self.world.turn()   # turn world and cells
        for user in self.users.values():    # turn users and creatures
            user.turn()

        for user in self.users.values():    # send users states
            user.push()


class User:
    def __init__(self, user_name):
        self.user_name = user_name
        self.creature = None
        self.command = None
        self.push_callback = None

    def set_command(self, command):
        self.command = command

    def set_push_callback(self, callback):
        self.push_callback = callback

    def turn(self):
        self.creature.turn(self.command)

    def push(self):
        if not self.push_callback:
            return

        self.push_callback({
            'perspective': self.creature.get_perspective()
        })

    def get_commands(self):
        return self.creature.commands
