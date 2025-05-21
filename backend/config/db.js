import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const { CONNECTION_STRING } = process.env;

export const sql = neon(CONNECTION_STRING)
