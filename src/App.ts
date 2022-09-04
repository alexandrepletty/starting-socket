// --- Dotenv
import dotenv from 'dotenv'
dotenv.config()

// --- Server application
import { Server } from './Server'

// --- Variables
const env = process.env
const server = Server.Instance

server.Start(async () => {
	// --- Log
	await console.log(`@Connected API ${env.API_NAME}\nServer running at http://localhost:${env.API_PORT}/`)
})