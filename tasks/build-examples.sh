# start in tasks/ even if run from root directory
cd "$(dirname "$0")"

# change directory to examples
cd "../examples"

# loop over all directories in examples
for d in */ ; do
# install all dependencies and run build command 
  cd $d && npm i && npm run build && cd ..
done

# restore to root dir
cd ".."

