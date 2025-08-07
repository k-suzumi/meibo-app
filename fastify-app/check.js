// diagnostic-check.js
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('✅ 接続テスト開始...')
    await prisma.$connect()
    console.log('✅ PrismaがMySQLに正常に接続されました！')
  } catch (error) {
    console.error('❌ Prismaの接続に失敗しました:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
