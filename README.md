# cleanup

Snap Chat for twitter

Tweet in any of your threads with the phrase `#cleanup` and the entire thread will be cleaned up for you.

You can follow the phrase `#cleanup` with a timer for how long until the process is kicked off. use any decimal number followed by one of the below delimeters to specify an amount of time

`h` hours
`m` minutes
`s` seconds

For example if you want to delete a thread in 5 minutes reply to the latest tweet with `#cleanup 5m`

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
