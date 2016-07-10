# -*- coding: utf-8 -*-

import settings
import tools


class Creature:
    commands = [
        'move',
    ]

    def __init__(self, id):
        self.id = id
        self.cell = None

        self.hunger = 0.0
        self.illness = 0.0

    def get_perspective(self):
        cells_view = []
        for x, y in settings.VIEW_CELLS:
            cell = self.cell.get_by_offset(x, y)
            if cell:
                cell_view = cell.get_view()
                cell_view.update({
                    'x': x,
                    'y': y
                })
                cells_view.append(cell_view)

        perspective = {
            'state': {
                'hunger': self.hunger,
                'illness': self.illness
            },
            'cells': cells_view
        }
        return perspective

    def set_cell(self, cell):
        self.cell = cell

    def turn(self, command):
        self.turn_needs()
        if command:
            self.turn_command(command)

    def turn_needs(self):
        self.hunger += settings.HUNGER_SPEED
        self.illness += self.hunger * settings.ILLNESS_SPEED - settings.HEALING_SPEED

        self.hunger = tools.adjust(self.hunger, 0.0, 1.0)
        self.illness = tools.adjust(self.illness, 0.0, 1.0)

    def turn_command(self, command):
        command_name = command.get('command')
        if command_name in self.commands:
            getattr(self, command_name)(**command)

    def move(self, direction, **kwargs):
        new_cell = self.cell.get_adjucent(direction)
        if not new_cell:
            return

        self.cell.leave(self)
        new_cell.enter(self)

    def __hash__(self):
        return hash(self.id)
