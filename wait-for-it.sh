# wait-for-it.sh
#!/bin/bash
host="$1"
shift
until nc -z "$host" 27017; do
  echo "Waiting for MongoDB..."
  sleep 2
done
echo "MongoDB is ready."
exec "$@"
