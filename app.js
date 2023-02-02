import net from 'net';
import axios from 'axios'

const HOST = "192.168.1.201";
const PORT = 9000;
const newsCenterUrl = 'http://xxxx:3000/news/add?token=1'

const server = net.createServer();
server.listen(PORT, HOST);

server.on("connection", (socket) => {

  console.log(`connected:${socket.remoteAddress}:${socket.remotePort}`);
  console.log(`local:${socket.localAddress}:${socket.localPort}`);

  // socket.write("服：你好客户端");

  socket.on("data", (data) => {
    const content = data.toString().replaceAll(' ', '');
    // demo: ����#�N{"humidity":"44.95","temperature": "19.01", "value": "9", "hcho": "50" }�#END#
    const dataArray = content.split('#END#');
    if (dataArray.length > 0) {
      dataArray.forEach((dataItem) => {
        const patternRes = /\{\s*(\S+)\s*\}/.exec(dataItem)
        if (patternRes) {
          // console.log(`原始数据：${dataItem}`);
          const parsedData = JSON.parse(patternRes[0])
          console.log(`处理后的数据：${JSON.stringify(parsedData)}`);
          axios({
            method: 'post',
            url: newsCenterUrl,
            params: {
              groupId: 'm1',
              content: JSON.stringify(parsedData)
            }
          }).then((res) => {
            console.log(res.data);
          }).catch(res => {
            console.log('信息上传失败！');
          }).finally(() => {
            console.log('--------------------');
          });

        }
      })
    }
  });

  socket.on("end", (data) => {
    console.log(`客户端${socket.remoteAddress}:${socket.remotePort}已断连`);
  });

});

console.log(`server listen on ${HOST}:${PORT}`);