import dotenv from 'dotenv';
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port : process.env.PORT,
    db_url : process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    saltRound: process.env.SALT_ROUND,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    // host: process.env.HOST,
}