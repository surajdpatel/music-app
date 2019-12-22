const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongodb = require('mongodb');
const db = require('../bin/database');
const ObjectID = require('mongodb').ObjectID;
const bucketName = 'tracks'
const { Readable } = require('stream');

router.get('/:trackID', (req, res) => {
  try {
    var trackID = new ObjectID(req.params.trackID);
  } catch (err) {
    return res.status(400).json({ message: "Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters" });
  }
  res.set('content-type', 'audio/mp3');
  // res.set('content-type', 'video/mp4');
  res.set('accept-ranges', 'bytes');

  let bucket = new mongodb.GridFSBucket(db, { bucketName });
  let downloadStream = bucket.openDownloadStream(trackID);

  downloadStream.on('data', (chunk) => { res.write(chunk) });
  downloadStream.on('error', () => { res.sendStatus(404) });
  downloadStream.on('end', () => { res.end() });
});

router.post('/uploadTracks', (req, res) => {
  const storage = multer.memoryStorage()
  const upload = multer({ storage, limits: { fields: 1, fileSize: 25000000/*25mb*/, files: 1, parts: 2 } });
  upload.single('track')(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, data: null, message: "Upload Request Validation Failed" });
    else if (!req.body.name) return res.status(400).json({ success: false, data: null, message: "No track name in request body" });

    // Covert buffer to Readable Stream
    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    let bucket = new mongodb.GridFSBucket(db, { bucketName });

    let uploadStream = bucket.openUploadStream(req.body.name);
    let id = uploadStream.id;
    readableTrackStream.pipe(uploadStream);

    uploadStream.on('error', () => res.status(500).json({ success: false, data: null, message: "Error uploading file" }));
    // TODO: add entry to music model
    uploadStream.on('finish', () => res.status(201).json({
      success: true,
      data: { id },
      message: "File uploaded successfully"
    }));
  });
});

module.exports = router;