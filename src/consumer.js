const { log, ansiGreen, ansiRed, ansiReset } = require("./utils/generic");
const { kafka } = require("./utils/kafka");

class KafkaConsumer {
  constructor(groupId, topicsToSubscribe) {
    this.consumerConfig = {
      groupId: groupId
    };

    this.topicsToSubscribe = topicsToSubscribe;
    this.consumer = kafka.consumer(this.consumerConfig);
  }

  async connect() {
    await this.consumer.connect();
  }

  async subscribeToTopics() {
    await Promise.all(
      this.topicsToSubscribe.map(topic => this.consumer.subscribe({ topic }))
    );
  }

  async runConsumer() {
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        log(
          `${ansiGreen}${this.consumerConfig
            .groupId}: [${topic}]: PART:${partition} ${ansiReset}`,
          message.value.toString()
        );
      }
    });
  }

  async initConsumer() {
    try {
      await this.connect();
      await this.subscribeToTopics();
      await this.runConsumer();
    } catch (error) {
      log(
        `${ansiRed}Error initializing consumer: ${error.message} ${ansiReset}`
      );
    }
  }
}

// Example usage
const consumer = new KafkaConsumer("rider-group", ["driver-updates"]);
consumer.initConsumer();
