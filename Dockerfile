# 代表基于哪个镜像
FROM node:alpine

# 创建镜像时，执行命令：创建文件夹
RUN mkdir -p /opt/m1

# 复制文件：复制当前项目的所有文件
COPY . /opt/m1

# 切换路径：
WORKDIR /opt/m1

# 创建镜像时，执行命令：安装依赖
RUN npm ci --legacy-peer-deps

# 暴露端口：9000
EXPOSE 9000

# 容器启动后，执行npm run serve
CMD [ "npm", "run", "start" ]