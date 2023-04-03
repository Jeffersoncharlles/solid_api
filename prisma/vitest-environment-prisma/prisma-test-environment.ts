import { PrismaClient } from '@prisma/client';
import 'dotenv/config'
import { execSync } from 'node:child_process';
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";

//postgresql://docker:docker@localhost:5432/apisolid?schema=public

const prisma = new PrismaClient()

function generationDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()

}

export default <Environment>{
  name: 'prisma',
  async setup() {
    // console.log('executou')//antes dos test
    const schema = randomUUID()
    const databaseUrl = generationDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseUrl

    execSync('npx prisma migrate deploy')//execute terminal


    return {
     async teardown() {
        // console.log('TearDown')

        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`) //excluindo database

        await prisma.$disconnect()
      },//depois dos test
    }
  }
}
