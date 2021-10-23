import { EntityController } from "@fastify-resty/core";
import { Word } from "@daltonscharff/spelling-bee-core";

@EntityController(Word, '/words')
export default class WordController {}