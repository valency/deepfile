# Node.js Image Server

This project is a simple image server for uploading and downloading image files. 

## Installation

```
npm install -g image-server-nice
```

## Usage

Navigate to the directory you want to save images. Then run the following command in that directory.

```
image-server-nice
```

Serve will listen on port `9007`.

To upload a image, just `POST` to `http://<server-ip>:9007/`. Multiple image uploading is supported and the maximum image size is 2 MB. 

Server will return the image info if successful, e.g.:

```
[{
    "size": 259129,
    "path": "2017-04-19/upload_fd1d5e4aee34df614c333f390bd6610d.jpg",
    "name": "5a00605df0ac4f8147ae78fd8ba73349.jpg",
    "type": "image/jpeg",
    "mtime": "2017-04-19T08:42:36.315Z"
}]
```

The image could be downloaded using `path` from the returning info, e.g.,:

```
http://<server-ip>:9007/2017-04-19/upload_fd1d5e4aee34df614c333f390bd6610d.jpg
```



