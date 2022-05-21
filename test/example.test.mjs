import { expect } from "chai";
import { read_file_and_send_to_socket, setFileName} from "../src/example.mjs";
import fs from 'fs'

describe("Untestable code", () => {

  beforeEach(() => {
    setFileName("./build/testfile")
    fs.writeFileSync("./build/testfile", "test-string")
  });

  it("function writes correct information", () => {
    let data
      read_file_and_send_to_socket({
        write: (d) => {
          data = JSON.parse(d)
          expect(data.data.includes("test-string"))
        },
        end: () => {}
      })
  });


  it("timestamp is in correct range", () => {
    const currentTime = new Date();
    const minuteAgo = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes()-1);
    const minuteInFuture = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes()+1);
    let data
    read_file_and_send_to_socket({
      write: (d) => {
        data = JSON.parse(d)
        expect(minuteAgo < (new Date(data.timestamp)) && (new Date(data.timestamp)) < minuteInFuture).to.be.true
      },
      end: () => {}
    })
  });

});
