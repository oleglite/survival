# -*- coding: utf-8 -*-

SERVER_TICK = 1

WORLD_SIZE = (100, 100)     # width, height

HUNGER_SPEED = 0.1
ILLNESS_SPEED = 0.1
HEALING_SPEED = 0.05


VIEW_CELLS = set()
for x in range(-2, 3):
    for y in range(-2, 3):
        VIEW_CELLS.add((x, y))
VIEW_CELLS -= {(-2, -2), (2, -2), (-2, 2), (2, 2)}
