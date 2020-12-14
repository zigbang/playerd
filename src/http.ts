import debug from "debug"
import express from "express"
import asyncHandler from "express-async-handler"

import { Player } from "./player"

export class Http {

    private app = express()

    private debug = debug("http")

    constructor(port: number, private player: Player = new Player()) {
        this.app.get("/play", asyncHandler(async (req, res) => {
            const url = req.query.url
            try {
                await this.player.play(url as string)
            } catch (e) {
            }
            res.send()
        }))

        this.app.get("/stop", asyncHandler(async (req, res) => {
            await this.player.stop()
            res.send()
        }))

        this.app.get("/status", asyncHandler(async (req, res) => {
            res.json(await this.player.status())
        }))

        this.app.listen(port, () => {
            this.debug(`Listening on port ${port}`)
        })
    }

    async start() {
        await this.player.start()
    }

}