cd ..
venv\Scripts\uvicorn src.server:app --reload --host="127.0.0.1" --port=8443 --workers=4 --log-level="info"