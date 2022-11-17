const express = require("express"); // call express
const app = express(); // define our app using express
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const url = require("url");

const {
  fetchEventsFromBlockChain,
  fetchEventsFromBlockChain2,
  isEventPurchased,
} = require("./utils/contracts.service");


const WebSocketServer = require("ws").Server;
const child_process = require("child_process");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.get(["/", "/:name"], (req, res) => {
  console.log("hello");
  let greeting = "<h1>Hello From Node on Fly!</h1>";
  let name = req.params["name"];
  if (name) {
    res.send(greeting + "</br>and hello to " + name);
  } else {
    res.send(greeting);
  }
});

app.get("/api/stream/thumbnail/:stremId", async (req, res) => {
  let stremId = req.params.stremId;
  let videoUrl = req.query.url;

  // console.log(videoUrl);

  const path = `./thumb/${stremId}_thumbnail.png`;

  if (fs.existsSync(path)) {
    res.sendFile(
      `/home/nikhil/Office_Projects/twitch-project/imbue-full/influence-proxy/thumb/${stremId}_thumbnail.png`
    );
    // path exists
    console.log("exists:", path);
  } else {
    console.log("DOES NOT exist:", path);
    await mt.forVideo(videoUrl, `./thumb/${stremId}_thumbnail.png`, {
      width: 200,
    });
  
    res.sendFile(
      `/home/nikhil/Office_Projects/twitch-project/imbue-full/influence-proxy/thumb/${stremId}_thumbnail.png`
    );
  }


});

/**
 * this api is to check if event is purchased
 * require eventIndex and wallet Address
 */

app.post("/api/check-event-purchased", async function (req, res) {
  var eventIndeses = req.body &&  req.body.eventIndeses;
  var walletAddress = req.body &&  req.body.walletAddress;
  const isPurchased = await isEventPurchased(eventIndeses, walletAddress);
  return res.json({ isPurchased: isPurchased });
});


/**
 * get events for creator 
 * require wallet address of creator
 */
app.get("/api/creator-events/:walletAddress", async (req, res) => {
  const walletAddress = req.params.walletAddress;
  const myd = await fetchEventsFromBlockChain({ walletAddress });
  res.json({ data: myd });
});



/**
 * get events for viewer 
 * require wallet address 
 */
app.get("/api/viewer-events/:walletAddress", async (req, res) => {
  const walletAddress = req.params.walletAddress;
  const myd = await fetchEventsFromBlockChain2({ walletAddress });
  res.json({ data: myd });
});

/**
 * calls the /stream?streamsonly=1&filters=[{"id": "record", "value": true}] route of Livepeer.com APIs to get list of recorded stream.
 * The response returns the empty content.
 */
app.get("/api/stream/recordedstream", async (req, res) => {
  const authorizationHeader = req.headers && req.headers["authorization"];
  try {
    const streamStatusResponse = await axios.get(
      // 'https://livepeer.com/api/stream?streamsonly=1&filters=[{"id": "record", "value": true}]',
      "https://livepeer.com/api/asset",
      {
        headers: {
          "content-type": "application/json",
          authorization: authorizationHeader, // API Key needs to be passed as a header
        },
      }
    );
    if (streamStatusResponse && streamStatusResponse.data) {
      res.statusCode = 200;
      res.json({ ...streamStatusResponse.data });
    } else {
      res.statusCode = 500;
      res.json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.statusCode = 500;
    res.json({ error });
  }
});

/**
 * calls the /api/stream/:streamId/sessions route of Livepeer.com APIs to get stream recorded video url.
 * The response returns the empty content.
 */

app.get("/api/stream/streamurl/:streamId", async (req, res) => {
  const authorizationHeader = req.headers && req.headers["authorization"];
  const streamId = req.params.streamId;
  try {
    const streamStatusResponse = await axios.get(
      // `https://livepeer.com/api/stream/${streamId}/sessions`,
      `https://livepeer.com/api/asset/${streamId}`,
      {
        headers: {
          "content-type": "application/json",
          authorization: authorizationHeader, // API Key needs to be passed as a header
        },
      }
    );

    if (streamStatusResponse && streamStatusResponse.data) {
      res.statusCode = 200;
      res.json({ ...streamStatusResponse.data });
    } else {
      res.statusCode = 500;
      res.json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.statusCode = 500;
    res.json({ error });
  }
});

/**
 * calls the /stream/:streamId/record route of Livepeer.com APIs to enable recording in stream.
 * The response returns the empty content.
 */

app.patch("/api/stream/:streamId/record", async (req, res) => {
  const authorizationHeader = req.headers && req.headers["authorization"];
  const streamId = req.params["streamId"];
  const isRecord = req.body && req.body.record;
  try {
    const enableStreamRecordRespose = await axios.patch(
      `https://livepeer.com/api/stream/${streamId}/record`,
      { record: isRecord },
      {
        headers: {
          "content-type": "application/json",
          authorization: authorizationHeader,
        },
      }
    );
    if (enableStreamRecordRespose.status == 204) {
      res.statusCode = 204;
      res.json({ status: "success" });
    } else {
      res.statusCode = 500;
      res.json({ error: "Something went wrong" });
    }
  } catch (error) {
    res.statusCode = 500;

    // Handles Invalid API key error
    if (error.response.status === 403) {
      res.statusCode = 403;
    }
    res.json({ error });
  }
});

/**
 * calls the /stream route of Livepeer.com APIs to create a new stream.
 * The response returns the playbackId and streamKey.
 * With this data available the ingest and playback urls would respectively be:
 * Ingest URL: rtmp://rtmp.livepeer.com/live/{stream-key}
 * Playback URL: https://cdn.livepeer.com/hls/{playbackId}/index.m3u8
 */
app.post("/api/stream", async function (req, res) {
  if (req.method === "POST") {
    const authorizationHeader = req.headers && req.headers["authorization"];
    const streamName = req.body && req.body.name;
    const streamProfiles = req.body && req.body.profiles;

    try {
      const createStreamResponse = await axios.post(
        "https://livepeer.com/api/stream",
        {
          name: streamName,
          profiles: streamProfiles,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: authorizationHeader, // API Key needs to be passed as a header
          },
        }
      );

      if (createStreamResponse && createStreamResponse.data) {
        res.statusCode = 200;
        res.json({ ...createStreamResponse.data });
      } else {
        res.statusCode = 500;
        res.json({ error: "Something went wrong" });
      }
    } catch (error) {
      res.statusCode = 500;

      // Handles Invalid API key error
      if (error.response.status === 403) {
        res.statusCode = 403;
      }
      res.json({ error });
    }
  }
});

/**
 * calls the /stream/<id> route of Livepeer.com APIs to get the stream's status to verify that the stream is live or not.
 * isActive: true means video segments are currently being ingested by Livepeer.com. isActive: false means the live stream is idle and no
 * video segments are currently being ingested by Livepeer.com.
 */

app.use("/api/stream/:streamId", async function (req, res) {
  const authorizationHeader = req.headers && req.headers["authorization"];
  const streamId = req.params.streamId;

  if (req.method === "GET") {
    try {
      const streamStatusResponse = await axios.get(
        `https://livepeer.com/api/stream/${streamId}`,
        {
          headers: {
            "content-type": "application/json",
            authorization: authorizationHeader, // API Key needs to be passed as a header
          },
        }
      );

      if (streamStatusResponse && streamStatusResponse.data) {
        res.statusCode = 200;
        res.json({ ...streamStatusResponse.data });
      } else {
        res.statusCode = 500;
        res.json({ error: "Something went wrong" });
      }
    } catch (error) {
      console.log(error);
      res.statusCode = 500;
      res.json({ error });
    }
  } else if (req.method == "DELETE") {
    try {
      const deleteStream = await axios.delete(
        `https://livepeer.com/api/stream/${streamId}`,
        {
          headers: {
            "content-type": "application/json",
            authorization: authorizationHeader, // API Key needs to be passed as a header
          },
        }
      );
      if (deleteStream && deleteStream.status === 204) {
        res.statusCode = 200;
        res.json({ msg: "Deleted" });
      } else {
        res.statusCode = 500;
        res.json({ error: "Something went wrong" });
      }
    } catch (error) {
      res.statusCode = 500;
      res.json({ error });
    }
  }
});

const port = process.env.PORT || 3001;

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

const wss = new WebSocketServer({ noServer: true, path: "/rtmp" });

wss.on("connection", (ws, req) => {
  console.log("Streaming socket connected");

  ws.send("WELL HELLO THERE FRIEND");

  const queryString = url.parse(req.url).search;
  const params = new URLSearchParams(queryString);
  const key = params.get("key");

  const rtmpUrl = `rtmp://rtmp.livepeer.com/live/${key}`;
  console.log(rtmpUrl);
  const ffmpeg = child_process.spawn("ffmpeg", [
    "-i",
    "-",

    // video codec config: low latency, adaptive bitrate
    "-c:v",
    "libx264",
    "-preset",
    "veryfast",
    "-tune",
    "zerolatency",

    // audio codec config: sampling frequency (11025, 22050, 44100), bitrate 64 kbits
    "-c:a",
    "aac",
    "-ar",
    "44100",
    "-b:a",
    "64k",

    //force to overwrite
    "-y",

    // used for audio sync
    "-use_wallclock_as_timestamps",
    "1",
    "-async",
    "1",

    //'-filter_complex', 'aresample=44100', // resample audio to 44100Hz, needed if input is not 44100
    //'-strict', 'experimental',
    "-bufsize",
    "1000",
    "-f",
    "flv",

    rtmpUrl,
  ]);

  // Kill the WebSocket connection if ffmpeg dies.
  ffmpeg.on("close", (code, signal) => {
    console.log(
      "FFmpeg child process closed, code " + code + ", signal " + signal
    );
    ws.terminate();
  });

  // Handle STDIN pipe errors by logging to the console.
  // These errors most commonly occur when FFmpeg closes and there is still
  // data to write.f If left unhandled, the server will crash.
  ffmpeg.stdin.on("error", (e) => {
    console.log("FFmpeg STDIN Error", e);
  });

  // FFmpeg outputs all of its messages to STDERR. Let's log them to the console.
  ffmpeg.stderr.on("data", (data) => {
    ws.send("ffmpeg got some data");
    console.log("FFmpeg STDERR:", data.toString());
  });

  ws.on("message", (msg) => {
    if (Buffer.isBuffer(msg)) {
      console.log("this is some video data");
      ffmpeg.stdin.write(msg);
    } else {
      console.log(msg);
    }
  });

  ws.on("close", (e) => {
    console.log("shit got closed, yo");
    ffmpeg.kill("SIGINT");
  });
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});
