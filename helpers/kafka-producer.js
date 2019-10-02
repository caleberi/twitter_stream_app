const KafkaProducer = require("kafka-node").Producer;
const Kafka = require("kafka-node");
const colors = require("colors");
const kafkaLogging = require("kafka-node/logging");

class KafkaProducerInterface {
        constructor(kafkaHost = {}) {
                this.host = kafkaHost;
        }
        // creates a kafka client
        createClient(host) {
                return new Kafka.KafkaClient(host);
        }

        // return  an instances of  a  kafka_producer
        createProducer(option = {}) {
                var client = this.createClient(this.host);
                return new KafkaProducer(client, option);
        }

        sendPayload(payload = []) {

                this.createProducer(this.host).on("ready", function() {
                        console.log("Producer  ready".blue);
                });

                this.createProducer(this.host).on("error", function(err) {
                        console.error(
                                `Problem with producing Kafka message ${err}`.red
                        );
                });
                this.createProducer(this.host).send(payload, (err, data) => {
                        if (!err) {
                                //this.kafkaLogger(data);
                                console.log(JSON.stringify(data));
                        }
                        else{
                                //this.kafkaLogger(err)
                                console.log("err");
                        throw  new Error(err);
                        }
                });
        }

        kafkaLogger(payload) {
                if (typeof payload == "object") {
                        return {
                                debug: console.debug.bind(console),
                                info: console.info.bind(console),
                                warn: console.warn.bind(console),
                                error: console.error.bind(console)
                        };
                }

                return {
                        debug: console.debug.bind(console),
                        info: console.info.bind(console),
                        warn: console.warn.bind(console),
                        error: console.error.bind(console)
                };
        }

        logger() {
                kafkaLogging.setLoggerProvider(kafkaLogger());
        }
}

const KafkaProducerCreate = (kafkaHost = {}) => {
        return new KafkaProducerInterface(kafkaHost);
};

module.exports = KafkaProducerCreate;
