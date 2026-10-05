#!/usr/bin/env bash
# Arranca el servidor de producción en segundo plano (para capturas y pruebas locales).
cd "$(dirname "$0")/.." || exit 1
PORT="${PORT:-3123}"
for pid in $(pgrep -f "next-server" 2>/dev/null); do kill "$pid" 2>/dev/null; done
sleep 1
nohup npx next start -p "$PORT" > /tmp/statecrm-next.log 2>&1 &
for i in $(seq 1 20); do
  if curl -s -o /dev/null "http://localhost:$PORT/"; then echo "ready on :$PORT"; exit 0; fi
  sleep 0.5
done
echo "server did not start"; tail -5 /tmp/statecrm-next.log; exit 1
