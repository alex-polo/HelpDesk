cd ..
venv\Scripts\uvicorn src.server:app --reload --host="0.0.0.0" --port=8443 --workers=2 --ssl-keyfile="cert\\device.key" --ssl-certfile="cert\\developer.host.crt" --ssl-ca-certs "cert\\rootCA.pem" --log-level="info"
rem --ssl-keyfile="d:\\dev\\108bit\\HelpDesk\\backend\\cert\\www.objectus.ru.key" --ssl-certfile="d:\\dev\\108bit\\HelpDesk\\backend\\cert\\certificate_ca.crt" --log-level="info"