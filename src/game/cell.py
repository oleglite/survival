# -*- coding: utf-8 -*-

from uuid import uuid4


class Cell:
    def __init__(self, point, food):
        self.id = str(uuid4())
        self.point = point
        self.food = food
        self.creatures = set()

    def enter(self, creature):
        self.creatures.add(creature)

    def leave(self, creature):
        if creature in self.creatures:
            self.creatures.remove(creature)

    def turn(self):
        pass    # TODO: raise food, etc

    def get_view(self):
        return {
            'id': self.id,
            'resources': {
                'food': self.food
            },
            'creatures': [creature.id for creature in self.creatures],
        }
