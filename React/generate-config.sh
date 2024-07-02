#!/bin/sh
/etc/nginx/conf.d/default.conf;
exec nginx -g "daemon off;";