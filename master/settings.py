# -*- coding: utf-8 -*-

SERVER_TICK = 0.05

WORLD_SIZE = (100, 100)     # width, height

HUNGER_SPEED = 0.003
ILLNESS_SPEED = 0.05
HEALING_SPEED = 0.02

HUNGER_RESTORED_BY_EATING = 0.3

MAX_FOOD_ON_CELL = 10
MAX_GROW_FOOD_SPEED = 0.1

SEND_USER_PERSPECTIVE_RATE = 1

DATABASE = {
    'user': 'postgres',
    'database': 'postgres',
    'host': '127.0.0.1',
    'password': 'postgres'
}


DEBUG = False

if DEBUG:
    SERVER_TICK = 1
    HUNGER_SPEED = 0.1
    ILLNESS_SPEED = 0.1
    HEALING_SPEED = 0.05
    MAX_GROW_FOOD_SPEED = 1


# Adjust tick-related settings
HUNGER_SPEED *= SERVER_TICK
ILLNESS_SPEED *= SERVER_TICK
HEALING_SPEED *= SERVER_TICK
MAX_GROW_FOOD_SPEED *= SERVER_TICK

