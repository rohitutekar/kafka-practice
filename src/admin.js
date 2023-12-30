const { kafka } = require("./utils/kafka");
const {
  log,
  ansiBlue,
  ansiReset,
  ansiGreen,
  ansiRed
} = require("./utils/generic");

const topics = [
  { topic: "driver-updates", numPartitions: 4, replicationFactor: 1 },
  { topic: "customer-updates", numPartitions: 2, replicationFactor: 1 }
];

class KafkaAdmin {
  constructor(kafka, topicsToCreate) {
    this.topicsToCreate = topicsToCreate;
    this.broker = kafka.admin();
  }

  async connect() {
    try {
      log(`${ansiBlue}Connecting to admin... ${ansiReset}`);
      await this.broker.connect();
      log(`${ansiGreen}Admin connected. ${ansiReset}`);
    } catch (error) {
      log(`${ansiRed}Error connecting to admin: ${error.message} ${ansiReset}`);
      throw error;
    }
  }

  async createTopics() {
    try {
      log(`${ansiBlue}Creating topics... ${ansiReset}`);
      const topicsCreated = await this.broker.createTopics({
        topics: this.topicsToCreate
      });

      if (!topicsCreated) {
        throw Error("Unexpected error");
      }

      log(`${ansiGreen}Topics created. ${ansiReset}`);
    } catch (error) {
      log(`${ansiRed}Error creating topics: ${error.message} ${ansiReset}`);
    }
  }

  async disconnect() {
    try {
      log(`${ansiBlue}Disconnecting admin... ${ansiReset}`);
      await this.broker.disconnect();
      log(`${ansiGreen}Admin disconnected. ${ansiReset}`);
    } catch (error) {
      log(`${ansiRed}Error disconnecting admin: ${error.message} ${ansiReset}`);
      throw error;
    }
  }

  async init() {
    await this.connect();
    await this.createTopics();
    await this.disconnect();
  }
}

const kafkaAdmin = new KafkaAdmin(kafka, topics);
kafkaAdmin.init();
