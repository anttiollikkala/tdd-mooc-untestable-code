import net from 'net'
import fs from'fs';

let fileName = "./README.md"

export const setFileName = (to) => {
  fileName = to
}

let server = net.createServer(function(c) {
  read_file_and_send_to_socket(c)
});

console.log("starting server")
server.listen(8080, '127.0.0.1');

export function read_file_and_send_to_socket(c) {
  fs.readFile(fileName, function(err, data) {
    c.write(JSON.stringify({
      timestamp: new Date(),
      data: String(data)
    }))
    c.end()
  });
}
