require('dotenv').config({ path: '.env.production' }) // for other environments

export const SERVER_HOST = process.env.SERVER_HOST
export const SERVER_PORT = process.env.SERVER_PORT

