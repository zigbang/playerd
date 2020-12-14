# playerd

A simple [`mpv`](https://github.com/mpv-player/mpv)-based music player which can be controlled by simple REST API calls.

## Prerequisites

* [`mpv`](https://github.com/mpv-player/mpv)

## How to use
```
> npx playerd

playerd v0.0.4
  player Starting mpv... +0ms
  http Listening on port 3000 +0ms
```

## Options

```
> npx playerd --help

Usage: playerd [options]

Options:
  -V, --version      output the version number
  -p, --port <port>  specify port (default: "3000")
  -h, --help         display help for command
```

## APIs

### `GET /play`

Plays the playlist URL

| Parameter | Description  |
| --------- | ------------ |
| `url`     | Playlist URL |

### `GET /stop`

Stops the music player
