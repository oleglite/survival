# -*- coding: utf-8 -*-

from collections import OrderedDict

from game.world import World
from game.creature import Creature
from game.user import User
from exceptions import GameError
from tools import Point


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

        start_cell = self.world.get_cell(Point(5, 5))
        creature = Creature(user_name, self.world)
        creature.set_cell(start_cell)
        user.set_creature(creature)

    def leave(self, user_name):
        if user_name not in self.users:
            return

        user = self.users[user_name]
        if user.creature:
            user.creature.set_cell(None)
            user.set_creature(None)

    def turn(self):
        self.world.turn()   # turn world and cells
        for user in self.users.values():    # turn users and creatures
            user.turn()

        for user in self.users.values():    # send users states
            user.push()
