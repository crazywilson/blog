#!/bin/sh
hexo g

gulp build

rm -rf public/

mv docs/ public

tar -czvf blog.tar.gz public/

scp blog.tar.gz flash:/data

ssh flash 'sudo bash /data/blog.sh'
