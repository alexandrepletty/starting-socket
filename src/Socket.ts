// --- Dependencies
import socketIO from 'socket.io'

// --- Variables
const env = process.env
const users: Array<any> = []

// --- Class
export class Socket {
	// --- Variables
	private static _instance: Socket
	private socket:socketIO.Socket
	private readonly socketID:any
	private socketTimer:NodeJS.Timer

	// --- Constructor
	constructor(socket: socketIO.Socket) {
		// --- Variables
		this.socket = socket
		this.socketID = this.socket.id

		// --- Functions
		this.CreateUser()
		this.Action()
		this.Disconnect()
	}

	// --- Create user session
	private CreateUser() {
		// --- Add user to array
		users[this.socketID] = {
			socket: this.socketID
		}

		console.log(`@User/Connected : ${this.socketID}`)
	}

	// --- Action
	private Action() {
		// --- Variables
		let route = env.SOCKET_ROUTE

		// --- Socket action
		/** ---
		 *
		 *
		 * 			--- Place queries here ---
		 *
		 *
		 */
	}

	// --- Disconnect
	private Disconnect() {
		// --- Disconnect user
		this.socket.on('disconnect', async (reason) => {
			console.log(`@User/Disconnected : ${this.socketID}`)
			// --- Delete user
			delete users[this.socketID]
		})
	}
}