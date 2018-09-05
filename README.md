## snapshot-adunion-web-new

#### 依赖
> koa、phantom、上传组件（使用自己的）、crypto（验证，node模块）、http模块、path模块

#### 文件结构说明：
> config: 配置文件； router：路由文件；data: 数据库、下游其他服务、文件上传等；

#### 支持参数：

htmlStr: <string> 模版参数(html代码转字符串，之后可以搞成一个后端渲染的内容)；
viewPort: <object>    w: <number> 视口的宽；
                    h：<number> 视口的高；

clipRect: <object>  top <number> 截图框的上边距；
                    width: <number> 截图框的宽；
                     height：<number> 截图框的高；
                     bottom:<number> 截图框的高；

config: <object> 配置参数
