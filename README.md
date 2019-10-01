# import-disqus

本工具可以将你的 Disqus 备份文件转换为 Pomment 的数据格式。

点击『选择数据文件』按钮，选择**已经解压**的 Disqus 备份文件（XML 格式），稍后已经打包好的数据文件会自动通过浏览器下载。

## 注意

* 由于 Disqus 没有在备份数据中提供评论者的电子邮箱地址，所有的评论如果在 Pomment 收到新回复，评论者将不会收到任何新的消息提醒。
* 同样，访客头像均直接使用 Disqus 的头像 API 地址，并记录在 `avatar` 字段中。

## 自行编译

```bash
git clone https://github.com/pomment/import-disqus
cd import-disqus
npm install
npm run build
```

## 重要声明

本工具为纯前端实现，你的数据不会被上传到我们的服务器。
