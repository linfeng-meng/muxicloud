# MUXICloud

#### Description
MUXI Cloud

## development

```bash
# Clone Project
git clone https://gitee.com/LinfengMeng/muxicloud.git

# 进入项目目录
cd muxicloud

# Enter the project directory
npm install

# It is recommended that you do not directly use ==cnpm== to install dependencies. There will be various strange bugs. The following operations can be used to solve the problem of slow download speed of npm
npm install --registry=https://registry.npmmirror.com

# Start Service
npm run dev
```

Browser Access http://localhost:80

## publish

```bash
# Build test environment
npm run build:stage

# Build production environment
npm run build:prod
```
