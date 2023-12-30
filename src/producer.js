const { kafka } = require("./utils/kafka");
const { log, ansiRed, ansiReset } = require("./utils/generic");

class KafkaProducer {
  constructor() {
    this.producer = kafka.producer({
      allowAutoTopicCreation: true
    });
  }

  async connect() {
    await this.producer.connect();
  }

  async disconnect() {
    await this.producer.disconnect();
  }

  async sendUpdate(topic, messages) {
    this.producer.send({ topic, messages });
  }

  async initProducer() {
    try {
      await this.connect();
    } catch (error) {
      log(
        `${ansiRed}Error initializing producer: ${error.message} ${ansiReset}`
      );
    }
  }
}

// Example usage
const producerInstance = new KafkaProducer();
producerInstance.initProducer();

distance = Math.ceil(Math.random() * 10) + 5;
const updatesInterval = setInterval(async () => {
  await producerInstance.sendUpdate("driver-updates", [
    {
      key: "location",
      value: distance > 0 ? `${distance} min away` : "Driver at pick-up point"
    }
  ]);

  if (distance <= 0) {
    clearInterval(updatesInterval);
    await producerInstance.disconnect();
    log(`${ansiRed}Producer disconnected. ${ansiReset}`);
  }

  distance -= 1;
}, 1000);
