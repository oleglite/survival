# -*- coding: utf-8 -*-

import settings
from master.communication.messages import construct


class User:
    def __init__(self, user_name, time_getter):
        self.user_name = user_name
        self.creature = None
        self.command = None
        self.push_callback = None
        self.last_pushed_at = 0
        self.time_getter = time_getter

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

    def push(self, forced=True):
        if not self.push_callback or not self.creature or not self.creature.cell:
            return

        is_time_to_push = (
            (self.time_getter() - self.last_pushed_at) > settings.SEND_USER_PERSPECTIVE_RATE
        )

        if forced or is_time_to_push:
            self.push_callback(construct(
                perspective=self.creature.get_perspective(),
                is_dead=not self.creature.alive
            ))

    def get_commands(self):
        return self.creature.commands
