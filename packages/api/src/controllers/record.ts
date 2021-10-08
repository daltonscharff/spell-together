import { EntityController } from "@fastify-resty/core";
import { Record } from "spelling-bee-core";

@EntityController(Record, '/records')
export default class RecordController {}