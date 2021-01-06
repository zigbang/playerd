import fs from "fs"
import path from "path"
import os from "os"
import AWS from "aws-sdk"
import debug from "debug"
import { Command } from "commander"
import _ from "lodash"
import * as hangulRomanization from "hangul-romanization"

const program = new Command()
program.arguments("<directory> <bucketName>")
program.action(async (directory, bucketName) => {
    debug.enable("playlist")
    const log = debug("playlist")

    // directory
    if (directory[0] === '~') {
        directory = path.join(os.homedir(), directory.slice(1));
    }
    log(`Using directory:`, directory)

    const name = _.last(directory.split(path.sep))
    log(`Using playlist name:`, name)

    // upload
    const s3 = new AWS.S3()
    const writer = require('m3u').writer()
    const files = fs.readdirSync(directory) // TODO sort by filename
    log("Uplading:")
    for (const original_filename of files) {
        const filename = hangulRomanization.convert(original_filename.replace(/[ ]/g, "_"))

        writer.file(filename)
        await s3.upload({
            Bucket: bucketName, Key: `mp3/${name}/${filename}`, ACL: "public-read",
            Body: fs.readFileSync(path.join(directory, original_filename))
        }).promise()
        log(`- ${original_filename}`)
    }
    await s3.upload({
        Bucket: bucketName, Key: `mp3/${name}/playlist.m3u`, ACL: "public-read", Body: writer.toString()
    }).promise()
    log(`Playlist: https://zigbang-iot.s3.amazonaws.com/mp3/${name}/playlist.m3u`)

})
program.parse(process.argv)
