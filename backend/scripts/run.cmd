cd ..
rem venv\Scripts\uvicorn src.server:app --reload --host="0.0.0.0" --port=8443 --workers=2 --ssl-keyfile="cert\\device.key" --ssl-certfile="cert\\developer.host.crt" --ssl-ca-certs "cert\\rootCA.pem" --log-level="info"
rem venv\Scripts\uvicorn src.server:app --reload --host="0.0.0.0" --port=8443 --workers=4
rem venv\Scripts\uvicorn src.server:app --reload --host="gunkonk.ru" --port=8443 --workers=4 --ssl-keyfile="cert\\privkey.pem" --ssl-certfile="cert\\cert.pem" --ssl-ca-certs "cert\\fullchain.pem" --log-level="info"
venv\Scripts\uvicorn src.server:app --reload --host="127.0.0.1" --port=8443 --workers=4 --ssl-keyfile="cert\\privkey.pem" --ssl-certfile="cert\\cert.pem" --ssl-ca-certs "cert\\fullchain.pem" --log-level="info"