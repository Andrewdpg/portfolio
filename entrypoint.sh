echo "window._env_ = {" > /usr/share/nginx/html/env-config.js

# Iterate over all environment variables that start with 'VITE_'
printenv | grep '^VITE_' | while IFS='=' read -r key value; do
  echo "  \"$key\": \"$value\"," >> /usr/share/nginx/html/env-config.js
done

# Close JSON object
echo "};" >> /usr/share/nginx/html/env-config.js

exec "$@"
