import asyncio
from aiopg.sa import create_engine
import sqlalchemy as sa

import settings


metadata = sa.MetaData()

tbl = sa.Table(
    'tbl', metadata,
    sa.Column('id', sa.Integer, primary_key=True),
    sa.Column('val', sa.String(255))
)


async def create_table(engine):
    async with engine.acquire() as conn:
        await conn.execute('DROP TABLE IF EXISTS tbl')
        await conn.execute('''CREATE TABLE tbl (
                                  id serial PRIMARY KEY,
                                  val varchar(255))''')


async def go():
    async with create_engine(**settings.DATABASE) as engine:
        async with engine.acquire() as conn:
            await create_table(engine)
            await conn.execute(tbl.insert().values(val='abc'))

            async for row in conn.execute(tbl.select()):
                print(row.id, row.val)


loop = asyncio.get_event_loop()
loop.run_until_complete(go())
