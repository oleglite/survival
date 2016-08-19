# -*- coding: utf-8 -*-

import random

import settings
from tools import Point, get_adjacent_point, offset_to_direction
from game.cell import Cell


class World:
    def __init__(self):
        self.width = settings.WORLD_SIZE[0]
        self.height = settings.WORLD_SIZE[1]
        self.cells = [
            [self.make_cell(Point(x, y)) for y in range(self.height)]
            for x in range(self.width)
        ]

    @staticmethod
    def make_cell(p):
        food = 5 if random.random() < 0.1 else 0
        grow_food_speed = random.random() * 0.1 if food else 0
        return Cell(p, food, grow_food_speed=grow_food_speed)

    def get_cell(self, point):
        x, y = point
        if 0 <= x < self.height and 0 <= y < self.height:
            return self.cells[x][y]

        return None

    def turn(self):
        for cell in self.iter_cells():
            cell.turn()

    def iter_cells(self):
        for cells in self.cells:
            for cell in cells:
                yield cell

    def get_adjucent_cell(self, cell, direction=None, offset=None):
        assert (direction is not None) != (offset is not None), 'Specify direction OR offset'
        if offset:
            direction = offset_to_direction[offset]
        return self.get_cell(get_adjacent_point(cell.point, direction))
