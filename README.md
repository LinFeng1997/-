成绩有毒
=====================


## 启动这个项目

* 环境：node
* UI框架：ionic3
* JS框架：Angular4+Typescript
* 连接设备API：cordova
* 本地存储：pouchDB
* 工具库：lodash/chartjs/highchart/moment等

### 项目结构

```
│  .editorconfig
│  .gitignore
│  config.xml
│  ionic.config.json
│  package.json
│  README.md
│  tree.txt
│  tsconfig.json
│  tslint.json
│  
├─resources
│  │  
│  │  
│  ├─android
│  │  ├─icon
│  │  │      
│  │  │      
│  │  └─splash
│  │          
│  │          
│  └─ios
│      ├─icon
│      │      
│      │      
│      └─splash
│             
│              
└─src
    │  declarations.d.ts
    │  index.html
    │  manifest.json
    │  service-worker.js
    │  
    ├─app //程序配置入口
    │      app.component.module.ts
    │      app.component.ts
    │      app.config.ts
    │      app.core.module.ts
    │      app.html
    │      app.module.ts
    │      app.routes.module.ts
    │      app.scss
    │      main.ts
    │      rxjs.extensions.ts
    │      
    ├─assets //资源，包括库和音频文件
    │     
    │              
    │              
    ├─components //组件
    │  
    │         
    │          
    ├─directives //自定义指令
    │      
    │      
    ├─entities //存放数据的结构
    │     
    │      
    ├─interfaces //抽象层，主要是接口和基类
    │     
    │      
    ├─pages //页面
    │      
    │ 
    │                   
    ├─pipes	//管道，用来过滤不安全的资源等
    │      safeHtml.pipe.ts
    │      safeResourceUrl.pipe.ts
    │      safeScript.pipe.ts
    │      safeStyle.pipe.ts
    │      safeUrl.pipe.ts
    │      
    ├─providers //服务，全局通信的单例
    │  │  about.Service.ts
    │  │  info.Service.ts
    │  │  user.Service.ts
    │  │  
    │  └─datas
    │          httpData.Service.ts
    │          jsonpData.Service.ts
    │          
    └─theme //样式
            variables.scss
```

### ionic安装

```bash
$ npm install -g ionic
```

### 运行

```bash
$ ionic serve
```
#### 运行截图


欢迎一起学习探讨ionic2、Angular2、Typescript、node等方面的知识...

## License

Copyright 2017 许云峰

转载请注明出处。
