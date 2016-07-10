# -*- coding: utf-8 -*-

from exceptions import GameError


class DIRECTIONS:
    UP = 0
    RIGHT = 1
    DOWN = 2
    LEFT = 3


def adjust(value, low, high):
    return min(high, max(low, value))


def debug(msg):
    print('DEBUG: {}'.format(msg))


def resolve_direction(direction, x, y):
    if direction == DIRECTIONS.UP:
        return x, y - 1
    elif direction == DIRECTIONS.RIGHT:
        return x + 1, y
    elif direction == DIRECTIONS.DOWN:
        return x, y + 1
    elif direction == DIRECTIONS.LEFT:
        return x - 1, y

    raise GameError('got wrong direction {} when resolving for ({}, {})'.format(direction, x, y))
