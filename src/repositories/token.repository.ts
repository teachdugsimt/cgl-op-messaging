import * as AWS from 'aws-sdk';
import { FastifyInstance } from 'fastify';
import { FastifyInstanceToken, getInstanceByToken } from 'fastify-decorators';
import { Token } from '../models';
import { FindManyOptions, Repository } from 'typeorm';
import { TokenEntity } from "./repository.types";

export default class TokenRepository {

  private instance: FastifyInstance = getInstanceByToken(FastifyInstanceToken);

  async add(data: TokenEntity): Promise<any> {
    const server: any = this.instance
    const tokenRepository: Repository<Token> = server?.db?.token;

    const result = await tokenRepository.createQueryBuilder()
      .insert()
      .into(Token)
      .values(data)
      .orUpdate({
        conflict_target: ['fcm_token', 'user_id'],
        overwrite: ['bundle_id', 'platform']
      })
      .execute();

    return { result }
    // return tokenRepository.save(data);
  }

  async find(options: FindManyOptions): Promise<any> {
    const server: any = this.instance
    const tokenRepository: Repository<Token> = server?.db?.token;

    const result = await tokenRepository.find(options);

    return result
  }

}
