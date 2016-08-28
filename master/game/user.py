# -*- coding: utf-8 -*-


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

    def set_creature(self, creature):
        self.creature = creature

    def turn(self):
        if self.creature:
            self.creature.turn(self.command)
            self.command = None

    def push(self):
        if not self.push_callback or not self.creature or not self.creature.cell:
            return

        self.push_callback({
            'perspective': self.creature.get_perspective()
        })

    def get_commands(self):
        return self.creature.commands
