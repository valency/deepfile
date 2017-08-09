# Deepfile - Node.js File Host

Deepfile is a simple file server for uploading and downloading files. 

To start service, use:

```
make install
make start
```

Server will listen on port `9007`.

To upload a file, `POST` to `http://<server-ip>:9007/`. Multiple file uploading is supported and the default maximum file size is 2 MB. Server will return the file info if successful, e.g.:

```
[{
    "size": 259129,
    "path": "data/2017-04-19/upload_fd1d5e4aee34df614c333f390bd6610d.jpg",
    "name": "5a00605df0ac4f8147ae78fd8ba73349.jpg",
    "type": "image/jpeg",
    "mtime": "2017-04-19T08:42:36.315Z"
}]
```

The file could be downloaded using `path` from the returning info, e.g.,:

```
http://<server-ip>:9007/data/2017-04-19/upload_fd1d5e4aee34df614c333f390bd6610d.jpg
```

To show the current file list, `GET` from `http://<server-ip>:9007/list/` or navigate to `http://<server-ip>:9007/` directly.

![](https://raw.githubusercontent.com/valency/deepfile/master/static/img/demo.png)

