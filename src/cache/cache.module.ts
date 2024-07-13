import { Module } from '@nestjs/common';
import { CacheModule as cacheNest } from '@nestjs/cache-manager';
import {redisStore} from "cache-manager-redis-store"

@Module({
  imports:[cacheNest.register({
    isGlobal:true,
    store:redisStore,
    host:'localhost',
    port:6379,
    ttl:60 * 60, // 1 hour
  })],
  exports:[cacheNest]
})
export class CacheModule {}
