# -*- coding: utf-8 -*-

from uuid import uuid4

import settings
from tools import adjust


class Cell:
    def __init__(self, point, food, grow_food_speed=0):
        self.id = str(uuid4())
        self.point = point
        self.food = food
        self.grow_food_speed = grow_food_speed
        self.creatures = set()

    def enter(self, creature):
        self.creatures.add(creature)

    def leave(self, creature):
        if creature in self.creatures:
            self.creatures.remove(creature)

    def turn(self):
        if self.grow_food_speed:
            self.food += self.grow_food_speed

        self.food = adjust(self.food, 0, settings.MAX_FOOD_ON_CELL)

    def get_view(self):
        return {
            'id': self.id,
            'resources': {
                'food': int(self.food)
            },
            'creatures': [creature.id for creature in self.creatures],
        }

    def eat(self):
        if self.food:
            self.food -= 1
            return True
        else:
            return False
