import debug from "debug"
import { Command } from "commander"

import { Http } from "./http"

debug.enable("http,player")

const packageJson = require("../package.json")
const program = new Command()
program.name(packageJson.name)
program.version(packageJson.version)
program
    .option("-p, --port <port>", "specify port", "3000");
program.parse(process.argv)

console.log(`${packageJson.name} v${packageJson.version}`)

const http = new Http(parseInt(program.port))
http.start()
