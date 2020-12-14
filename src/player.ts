import debug from "debug"
import mpv from "node-mpv"

export class Player {

    private mpv = new mpv()

    private debug = debug("player")

    async start() {
        this.debug("Starting mpv...")
        await this.mpv.start()
    }

    async play(url: string) {
        this.debug(`Playing ${url}...`)
        await this.mpv.mute(false)
        await this.mpv.loopPlaylist('inf')
        await this.mpv.load(url, 'replace')
    }

    async stop() {
        this.debug("Stop")
        await this.mpv.mute(true)
    }

    async status() {
        const [muted, paused, running, seekable] = await Promise.all([
            this.mpv.isMuted(),
            this.mpv.isPaused(),
            this.mpv.isRunning(),
            this.mpv.isSeekable()
        ])
        return { muted, paused, running, seekable }
    }

}
