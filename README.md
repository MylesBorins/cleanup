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
  "username": "YourTwitterNameNoAtSymbol",
  "consumer_key": "YouGet",
  "consumer_secret": "TheseKey",
  "access_token": "FromTheTwitter",
  "access_token_secret": "AppsWebsite",
}
```

## Amnesia

By including the key "memoryLength" in your local.json `cleanup` will help your timeline forget all retweets
base on a set duration of time. You can provide a number or alternatively use the same grammar used in the tweets

A good default is `24h`

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
