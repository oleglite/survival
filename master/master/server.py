# -*- coding: utf-8 -*-

import asyncio
from aiohttp import web, MsgType

from master import settings
from master.utils import tools
from master.communication.handler import CommandHandler
from master.game.game import Game


async def websocket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    handler = CommandHandler(game, ws)

    tools.debug('Connected')

    async for msg in ws:
        if msg.tp == MsgType.text:
            await handler.process(msg)
        elif msg.tp == MsgType.error:
            print('ws connection closed with exception %s' % ws.exception())
        elif msg.tp == MsgType.closed:
            handler.closed()

    ws.close()
    print('websocket connection closed')

    return ws


async def game_loop(game, loop):
    end_time = loop.time() + settings.SERVER_TICK
    tools.debug('Game loop started')
    while True:
        wait = end_time - loop.time()
        if wait > 0:
            await asyncio.sleep(wait)
        else:
            game.turn()
            end_time += settings.SERVER_TICK


async def init(game, loop):
    app = web.Application(loop=loop)
    app['game'] = game

    app.router.add_route('GET', '/api/v1/', websocket_handler)

    srv = await loop.create_server(app.make_handler(), '127.0.0.1', 8080)
    tools.debug("Server started at http://127.0.0.1:8080")
    return srv


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    game = Game(loop.time)
    tasks = [
        asyncio.ensure_future(init(game, loop)),
        asyncio.ensure_future(game_loop(game, loop)),
    ]
    try:
        loop.run_until_complete(asyncio.wait(tasks))
    except KeyboardInterrupt:
        loop.stop()
        print('Stopped')
    loop.close()
