# cleanup

Tweet in any of your threads with the phrase `#cleanup` and the entire thread will be cleaned up for you.

You can follow the phrase `#cleanup` with a timer for how long until the process is kicked off. use any decimal number followed by one of the below delimeters to specify an amount of time

`h` hours
`m` minutes
`s` seconds

For example if you want to delete a thread in 5 minutes reply to the latest tweet with `#cleanup 5m`

## Configuration

A template for the configuration file needed for this application is included.

To get started simply copy it

```bash
$ cp local.json-dist local.json

```

You are then free to fill it in with data from https://apps.twitter.com

```json
{
  "userid": "YourTwitterUserID",
  "consumer_key": "YouGet",
  "consumer_secret": "TheseKey",
  "access_token": "FromTheTwitter",
  "access_token_secret": "AppsWebsite",
  "env": "Your API Env"
}
```

## Amnesia

By including the key "amnesia" in your local.json `cleanup` will help your timeline forget all retweets.
You can either provide a number in ms or a time using the same grammer described above

A good default is `24h`

## OMG DOCKER

Clone this repo, and create a local.json.

**Build a container:**

```bash
docker build -t cleanup .
```

**Run the container:**
```
docker run -d --name cleanup --restart always -v $PWD/local.json:/local.json cleanup -p 8000:8000
```
