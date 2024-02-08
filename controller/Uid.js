const express=require("express")
const Uid =require("../model/uid");
export const RegisterUid = async (req, res) => {
  const { email, name, password } = req.body;
  
  await new Uid({
   Uid
  })
    .save()
    .then((response) => {
      res.status(200).json({ message: "add users successfully ", response });
    })
    .catch((error) => {
      res.status(400).json({ message: "An error occurred" });
      console.log("error", error);
    });
};
export const Convert = async (req, res) => {
  const rtspUrl = req.query.rtsp;

  // Set FFmpeg input as RTSP stream
  ffmpeg(rtspUrl)
    // Configure FFmpeg for HLS output
    .addOptions([
      '-c:v h264',
      '-hls_time 2',
      '-hls_list_size 5',
      '-start_number 1',
      '-f hls',
    ])
    // Output HLS stream to response
    .on('end', () => res.end())
    .pipe(res, { end: true });
};
