# -*- coding: utf-8 -*-

from collections import namedtuple


Point = namedtuple('Point', ['x', 'y'])


class DIRECTIONS:
    UP = 0
    RIGHT = 1
    DOWN = 2
    LEFT = 3

    ALL = [UP, RIGHT, DOWN, LEFT]


_direction_offset_map = (
    (DIRECTIONS.UP, Point(0, -1)),
    (DIRECTIONS.RIGHT, Point(1, 0)),
    (DIRECTIONS.DOWN, Point(0, 1)),
    (DIRECTIONS.LEFT, Point(-1, 0)),
)

direction_to_offset = dict(_direction_offset_map)
offset_to_direction = dict(map(lambda i: (i[1], i[0]), _direction_offset_map))


def adjust(value, low, high):
    return min(high, max(low, value))


def debug(msg):
    print('DEBUG: {}'.format(msg))


def get_adjacent_point(p, direction):
    x, y = direction_to_offset[direction]
    return Point(p.x + x, p.y + y)


def assign(*args):
    res = args[0]
    for obj in args[1:]:
        res.update(obj)
    return res


class TimeConstraint(object):
    def __init__(self, time_getter):
        self.time_getter = time_getter
        self.acquired_till = 0

    def acquire(self, delay):
        now = self.time_getter()
        if self.acquired_till >= now:
            return False
        self.acquired_till = now + delay
        return True
