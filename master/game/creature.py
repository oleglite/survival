# -*- coding: utf-8 -*-

import settings
from tools import Point, adjust, assign, TimeConstraint


def view_cells():
    result = set()
    for x in range(-2, 3):
        for y in range(-2, 3):
            result.add((x, y))
    result -= {(-2, -2), (2, -2), (-2, 2), (2, 2)}
    return result


class Creature:
    commands = [
        'move',
        'eat',
    ]

    def __init__(self, id, world, time_getter):
        self.id = id
        self.cell = None
        self.world = world
        self.time_getter = time_getter

        self.hunger = 0.0
        self.illness = 0.0
        self.move_constraint = TimeConstraint(0.1, time_getter)

    def set_cell(self, cell):
        if self.cell:
            self.cell.leave(self)
        self.cell = cell
        if self.cell:
            self.cell.enter(self)

    def turn(self, command):
        self.turn_needs()
        if command:
            self.turn_command(command)

    def turn_needs(self):
        self.hunger += settings.HUNGER_SPEED
        self.illness += self.hunger * settings.ILLNESS_SPEED - settings.HEALING_SPEED

        self.hunger = adjust(self.hunger, 0.0, 1.0)
        self.illness = adjust(self.illness, 0.0, 1.0)

    def turn_command(self, command):
        command_name = command.get('command')
        if command_name in self.commands:
            getattr(self, command_name)(**command)

    def iter_view_cells(self):
        cur_x, cur_y = self.cell.point
        for x, y in view_cells():
            yield Point(x, y), self.world.get_cell(Point(cur_x + x, cur_y + y))

    def get_perspective(self):
        perspective = {
            'state': {
                'hunger': self.hunger,
                'illness': self.illness
            },
            'cells': [
                assign(cell.get_view(), {'point': list(rel_point)})
                for rel_point, cell in self.iter_view_cells() if cell
            ]
        }
        return perspective

    def __hash__(self):
        return hash(self.id)

    # COMMANDS

    def move(self, direction, **kwargs):
        if not self.move_constraint.acquire():
            return

        new_cell = self.world.get_adjucent_cell(self.cell, direction=direction)
        if new_cell:
            self.set_cell(new_cell)

    def eat(self, **kwargs):
        if self.cell.eat():
            self.hunger -= settings.HUNGER_RESTORED_BY_EATING
            self.hunger = adjust(self.hunger, 0.0, 1.0)
