#!/bin/sh
hexo g

gulp build

tar -czvf blog.tar.gz dist/

scp blog.tar.gz flash:/data

ssh flash 'sudo bash /data/blog.sh'
