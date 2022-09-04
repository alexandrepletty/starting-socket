// --- Dependencies
import express from 'express'
import http from 'http'
import socketIO from 'socket.io'

// --- Socket
import { Socket } from './Socket'

// --- Variables
const env = process.env

// --- Class
export class Server {
	// --- Variables
	public static readonly PORT:any = env.API_PORT
	private static _instance: Server
	private app:express.Application
	private httpServer:http.Server
	public io:socketIO.Server
	public port:string|number

	// --- Constructor
	constructor() {
		this.App()
		this.Config()
		this.Socket()
		this.Listen()
	}

	// --- Instance
	public static get Instance() {
		return this._instance || (this._instance = new this())
	}

	// --- Application
	private App():void {
		this.app = express()
	}

	// --- Config
	private Config():void {
		this.port = env.API_PORT || Server.PORT
		this.httpServer = new http.Server(this.app)
	}

	// --- Start server socket
	private Socket(): void {
		// --- Create socket
		this.io = new socketIO.Server(this.httpServer, {maxHttpBufferSize: 1e8, cors: {origin: '*'}})
	}

	// --- Listen socket
	private Listen(): void {
		// --- Start connection socket
		this.io.on('connection', async (socket:socketIO.Socket) => {
			// --- Socket class
			new Socket(socket)
		})
	}

	// --- Start application
	Start(callback:any) {
		// --- Listen server
		this.httpServer.listen(this.port, callback)
	}
}