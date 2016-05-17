# cleanup

Snap Chat for twitter

## OMG DOCKER

Clone this repo, and create a local.json.

**Build a container:**

```bash
docker build -t cleanup .
```

**Run the container:**
```
docker run -d --name cleanup -v $PWD/local.json:/local.json cleanup
```
