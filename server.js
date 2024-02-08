// const express = require('express');
// const rtsp = require('node-rtsp-stream');
// const cors=require("cors");
// const app = express();
// const port = process.env.PORT || 3001;
// app.use(cors());

// const cameras = [
//   {
//     name: 'Camera 1',
//     streamUrl: 'rtsp://192.168.100.166:554/h264?username=admin&password=123456',
//     wsPort: 9999,
//     ffmpegOptions: {
//       '-stats': '',
//       '-r': 30,
//       '-s': '640x480'
//     }
//   },
//   {
//     name: 'Camera 2',
//     streamUrl: 'rtsp://192.168.100.165:554/h264?username=admin&password=123456',
//     wsPort: 9998,
//     ffmpegOptions: {
//       '-stats': '',
//       '-r': 30,
//       '-s': '640x480'
//     }
//   },
// ];

// const streams = cameras.map(camera => new rtsp(camera));
// app.get('/', (req, res) => {
//   res.json(cameras)
//   console.log(cameras);
// });
// app.get('/cameras', (req, res) => {
//   console.log(cameras);
//   res.status(200).json({ cameras }); // Corrected the code to send response
// });
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// const express = require('express');
// const cors = require('cors');
// const ffmpeg = require('fluent-ffmpeg');
// const fs = require('fs');
// const path = require('path');
// const app = express();
// const port = process.env.PORT || 3001;

// app.use(cors());
// app.use('/hls', express.static('hls'));

// const cameras = [
//   {
//     name: 'Camera_1',
//     streamUrl: 'rtsp://192.168.100.166:554/h264?username=admin&password=123456',
//     wsPort: 9999,
//   },
//   {
//     name: 'Camera_2',
//     streamUrl: 'rtsp://192.168.100.165:554/h264?username=admin&password=123456',
//     wsPort: 9998,
//   },
// ];

// // Create HLS directory
// const hlsDir = path.join(__dirname, 'hls');
// if (!fs.existsSync(hlsDir)) {
//   fs.mkdirSync(hlsDir, { recursive: true });
// }

// // Initialize an array to store HLS streams
// const streams = [];

// // Process each camera
// cameras.forEach((camera) => {
//   const hlsPath = path.join(hlsDir, `${camera.name}_stream.m3u8`);

//   // Create an HLS stream for each camera
//   const ffmpegCommand = ffmpeg()
//     .input(camera.streamUrl)
//     .inputOptions(['-rtsp_transport', 'tcp'])
//     .outputOptions([
//       '-c:v copy',
//       '-hls_time 1', // Decreased HLS segment duration to reduce latency
//       '-hls_list_size 3', // Reduced the HLS list size
//       '-start_number 1',
//       '-hls_allow_cache 0', // Disabled cache to reduce latency
//     ])
//     .output(hlsPath)
//     .on('end', () => {
//       console.log(`HLS stream for ${camera.name} has ended.`);
//     })
//     .on('error', (err) => {
//       console.error(`Error converting stream to HLS for ${camera.name}: ${err}`);
//     });

//   // Start the HLS stream
//   const ffmpegStream = ffmpegCommand.run();

//   // Store the HLS stream information in the array
//   streams.push({
//     name: camera.name,
//     hlsPath: `/hls/${camera.name}_stream.m3u8`,
//   });
// });

// // Serve HLS streams
// app.get('/streams', (req, res) => {
//   res.json(streams);
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// const express = require("express");
// const http = require("http");
// const Stream = require("node-rtsp-stream");
// const WebSocket = require("ws");
// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
// const stream = new Stream({
//   name: "name",
//   streamUrl: "rtsp://192.168.100.166:554/h264?username=admin&password=123456",
//   wsPort: 9999,
//   ffmpegOptions: {
//     "-stats": "",
//     "-r": 30,
//     "-s": "640x480",
//   },
// });
// wss.on("connection", (ws) => {
//   console.log("WebSocket connection established");

//   stream.on("data", (data) => {
//     ws.send(data);
//   });

//   ws.on("close", () => {
//     console.log("WebSocket connection closed");
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// const app = require("express")(),
//   server = require("http").Server(app),
//   io = require("socket.io")(server),
//   rtsp = require("rtsp-ffmpeg");
// cors = require("cors");
// app.use(cors());
// server.listen(4000);
// var uri = "rtsp://192.168.100.166:554/h264?username=admin&password=123456",
//   ffmpegConfig = {
//     input: uri,
//     rate: 10,
//     resolution: "640x480",
//     quality: 3,
//   },
//   stream = new rtsp.FFMpeg(ffmpegConfig);

// io.on("connection", function (socket) {
//   var pipeStream = function (data) {
//     socket.emit("data", data.toString("base64"));
//   };

//   stream.on("data", pipeStream);

//   socket.on("disconnect", function () {
//     stream.removeListener("data", pipeStream);
//   });
// });
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
// const express = require("express");
// const http = require("http");
// const socketIO = require("socket.io");
// const rtsp = require("rtsp-ffmpeg");
// const cors = require("cors");

// const app = express();
// const server = http.Server(app);
// const allowedOrigins = ["http://localhost:8081"]; // Add more origins as needed

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
// const io = socketIO(server, {
//   cors: corsOptions,
// });
// app.use(cors(corsOptions));
// const port = process.env.PORT || 4000;

// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// const uri = "rtsp://192.168.100.166:554/h264?username=admin&password=123456";
// const ffmpegConfig = {
//   input: uri,
//   rate: 10,
//   resolution: "640x480",
//   quality: 3,
// };
// const stream = new rtsp.FFMpeg(ffmpegConfig);

// io.on("connection", (socket) => {
//   const pipeStream = (data) => {
//     socket.emit("data", data.toString("base64"));
//   };

//   stream.on("data", pipeStream);

//   socket.on("disconnect", () => {
//     stream.removeListener("data", pipeStream);
//   });
// });

// // API endpoint to start streaming
// app.get("/start-stream", (req, res) => {
//   stream.start();

//   res.status(200).send("Streaming started");
// });

// // API endpoint to stop streaming
// app.get("/stop-stream", (req, res) => {
//   // Stop streaming
//   stream.stop();

//   res.status(200).send("Streaming stopped");
// });

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const rtsp = require("rtsp-ffmpeg");
const cors = require("cors");

const app = express();
const server = http.Server(app);
const io = socketIO(server);
app.use(cors());

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const cameras = [
  {
    name: "Camera_1",
    streamUrl: "rtsp://192.168.100.166:554/h264?username=admin&password=123456",
  },
  // {
  //   name: "Camera_2",
  //   streamUrl: "rtsp://192.168.100.165:554/h264?username=admin&password=123456",
  // },
];

const streams = cameras.map((camera) => {
  const ffmpegConfig = {
    input: camera.streamUrl,
    rate: 10,
    resolution: "640x480",
    quality: 3,
  };
  const stream = new rtsp.FFMpeg(ffmpegConfig);

  // Handling the connection for each camera
  io.on("connection", (socket) => {
    const pipeStream = (data) => {
      socket.emit("data", data.toString("base64"));
    };

    // Attach the event listener for data stream
    stream.on("data", pipeStream);

    socket.on("disconnect", () => {
      // Remove the event listener when a client disconnects
      stream.removeListener("data", pipeStream);
    });
  });

  return stream;
});

// Sending camera list to clients on connection
io.on("connection", (socket) => {
  socket.emit("cameraList", cameras);

  socket.on("disconnect", () => {
    // Handle disconnect logic if needed
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const request = require("request");

app.get("/stream", (req, res) => {
  const streamUrl = req.query.streamUrl;

  // Find the matching stream based on the streamUrl
  const matchingStream = streams.find((stream) => stream.ffmpeg?.options?.input === streamUrl);

  if (matchingStream) {
    // Use request module to pipe the stream to the response
    request(matchingStream.ffmpeg.options.input).pipe(res);
  } else {
    res.status(404).send("Stream not found");
  }
});



// Additional improvements:
// - Implement error handling for FFMpeg initialization and RTSP connection
// - Secure the server by using HTTPS, especially if it's deployed in production
// - Implement authentication and authorization mechanisms if necessary
// - Use environment variables for sensitive information like RTSP credentials
