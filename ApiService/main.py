from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
import os
import psycopg2
from psycopg2 import sql
from datetime import date

from dotenv import load_dotenv

from pathlib import Path
env_path = Path('.') / '.env'

load_dotenv(dotenv_path=env_path)

POSTGRES_USER: str = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_SERVER: str = os.getenv("POSTGRES_SERVER", "localhost")
# default postgres port is 5432
POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", 5432)
POSTGRES_DB: str = os.getenv("POSTGRES_DB", "tdd")
DATABASE_URI = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EventRequest(BaseModel):
    kind: str
    session_id: str
    url: str
    target_id: str
    target_class: str
    meta: str
    domain: str


@app.get("/get-domains")
def get_events():
    try:
        conn = psycopg2.connect(DATABASE_URI)
        cursor = conn.cursor()
        query = sql.SQL("SELECT * FROM events")
        cursor.execute(query)
        rows = cursor.fetchall()
        # Convert rows to a list of dictionaries for JSON serialization
        data = [{"id": row[0], "domain": row[8], } for row in rows]
        cursor.close()
        conn.close()
        return {"data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)


@app.get("/domain-metrics/")
def get_events(domain: str):
    try:
        conn = psycopg2.connect(DATABASE_URI)
        cursor = conn.cursor()
        query = sql.SQL(
            "SELECT * FROM events WHERE domain ILIKE {}").format(sql.Literal('%' + domain + '%'))
        cursor.execute(query)
        rows = cursor.fetchall()
        # Convert rows to a list of dictionaries for JSON serialization
        data = [{"id": row[0], "session_id": row[2], "url": row[6], "kind": row[1], "target_id": row[3],
                 "target_class": row[4], "meta": row[5], "created_on": row[7], "domain":row[8]} for row in rows]
        cursor.close()
        conn.close()
        return {"data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)


@app.get("/metrics-all")
def get_events():
    try:
        conn = psycopg2.connect(DATABASE_URI)
        cursor = conn.cursor()
        query = sql.SQL("SELECT * FROM events")
        cursor.execute(query)
        rows = cursor.fetchall()
        # Convert rows to a list of dictionaries for JSON serialization
        data = [{"id": row[0], "kind": row[1], "session_id": row[2], "url": row[3], "target_class": row[4],
                 "meta": row[5], "target_id": row[6], "created_on": row[7], "domain": row[8]} for row in rows]
        cursor.close()
        conn.close()
        return {"data": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)


@app.post("/events")
async def create_event(event: EventRequest):
    try:
        # eventJSON = await event.json()
        conn = psycopg2.connect(DATABASE_URI)
        cursor = conn.cursor()
        today = date.today()
        query = sql.SQL("INSERT INTO events ( session_id, url, kind, target_id, target_class, meta, created_on, domain) VALUES ( '%s', '%s','%s', '%s','%s', '%s', '%s', '%s');" % (
            event.session_id, event.url, event.kind, event.target_id, event.target_class, event.meta, today, event.domain))
        cursor.execute(query)
        conn.commit()
        cursor.close()
        conn.close()
        return {"message": "Event created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=e)


if __name__ == "__main__":
    import uvicorn

    conn = psycopg2.connect(DATABASE_URI)

    cur = conn.cursor()

    cur.execute("CREATE TABLE IF NOT EXISTS events (event_id SERIAL PRIMARY KEY, kind VARCHAR(50) NOT NULL, session_id VARCHAR(50) NOT NULL, target_id VARCHAR(50) NOT NULL, target_class VARCHAR(50) NOT NULL, meta VARCHAR(255) NOT NULL, url VARCHAR(255) NOT NULL, created_on TIMESTAMP NOT NULL, domain VARCHAR(255) NOT NULL)")
    conn.commit()
    cur.close()
    conn.close()
    uvicorn.run(app, host="0.0.0.0", port=8001)
