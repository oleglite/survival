# -*- coding: utf-8 -*-

import json
import aiohttp
import asyncio
from pprintpp import pprint


# client for debugging


url = 'http://127.0.0.1:8080/api/v1/'


def process(ws, data):
    print(':: response:')
    pprint(data)
    print()
    # ws.send_str(input('> '))


async def main():
    session = aiohttp.ClientSession()

    async with session.ws_connect(url) as ws:
        ws.send_str(json.dumps({'command': 'enter', 'user_name': '1'}))

        async for msg in ws:
            if msg.tp == aiohttp.MsgType.text:
                process(ws, json.loads(msg.data))
            elif msg.tp == aiohttp.MsgType.closed:
                ws.close()
                print(':: closed')
                break
            elif msg.tp == aiohttp.MsgType.error:
                print(':: error')
                break

    session.close()


loop = asyncio.get_event_loop()
loop.run_until_complete(main())
