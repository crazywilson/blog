#!/bin/sh
hexo g

gulp build

rm -rf public/

mv docs/ public

tar -czvf blog.tar.gz public/

scp blog.tar.gz flash:/data

rm blog.tar.gz

ssh flash 'sudo bash /data/blog.sh'
