import { EntityController, GET } from "@fastify-resty/core";
import { Record } from "@daltonscharff/spelling-bee-core";

@EntityController(Record, '/records')
export default class RecordController {
    @GET('/test')
    testResponse(req, reply) {
        console.log("test");
        return "HELLO TEST"
    }
}