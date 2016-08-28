# -*- coding: utf-8 -*-

SERVER_TICK = 1

WORLD_SIZE = (100, 100)     # width, height

HUNGER_SPEED = 0.1
ILLNESS_SPEED = 0.1
HEALING_SPEED = 0.05

HUNGER_RESTORED_BY_EATING = 0.5

MAX_FOOD_ON_CELL = 10
MAX_GROW_FOOD_SPEED = 0.1


DATABASE = {
    'user': 'postgres',
    'database': 'postgres',
    'host': '127.0.0.1',
    'password': 'postgres'
}
