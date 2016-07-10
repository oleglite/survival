# -*- coding: utf-8 -*-

import random

import settings
import tools


class World:
    def __init__(self):
        self.width = settings.WORLD_SIZE[0]
        self.height = settings.WORLD_SIZE[1]
        self._cells = [
            [self.make_cell(x, y) for y in range(self.height)]
            for x in range(self.width)
        ]

    def make_cell(self, x, y):
        return Cell(x, y, self, 5 if random.random() < 0.1 else 0)

    def get_cell(self, x, y):
        if 0 <= x < self.height and 0 <= y < self.height:
            return self._cells[x][y]

        return None

    def turn(self):
        for cells in self._cells:
            for cell in cells:
                cell.turn()


class Cell:
    def __init__(self, x, y, world, food):
        self.x = x
        self.y = y
        self.world = world
        self.food = food
        self.creatures = set()

    def enter(self, creature):
        self.creatures.add(creature)
        creature.set_cell(self)
        return True

    def leave(self, creature):
        self.creatures.pop(creature)
        creature.set_cell(None)
        return True

    def turn(self):
        pass

    def get_by_offset(self, x, y):
        return self.world.get_cell(self.x + x, self.y + y)

    def get_adjucent(self, direction):
        x, y = tools.resolve_direction(direction, self.x, self.y)
        return self.world.get_cell(x, y)

    def get_view(self):
        return {
            'resources': {
                'food': self.food
            },
            'creatures': [creature.id for creature in self.creatures],
        }
