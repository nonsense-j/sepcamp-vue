# 项目介绍

sepcamp是一个用于UCAS高级软件工程课程的管理网站，以课程流程管理为核心对学生的课程作业以及项目开发流程进行监督。
项目基于`Nuxt3+Vuetify3`.
## 项目部署

首先需要下载相关依赖包(推荐使用yarn):

```bash
# yarn -- 1.22.19
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

`vuetify3`以及`mdi font`都没有被安装，需要进行安装
```bash
# vuetify3
yarn add vuetify@next sass
# material design font
yarn add @mdi/font
```

## 开发服务器 Development

默认网页将会部署在 http://localhost:3000

```bash
# yarn
yarn dev -o

# npm
npm run dev
```

## 网页应用 Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

