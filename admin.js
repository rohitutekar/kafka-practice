const { kafka, log } = require("./helper");

const initAdmin = async () => {
  const broker = kafka.admin();

  log("Connecting to admin...");
  await broker.connect();
  log("Admin connected...");

  log("Creating topics...");
  await broker.createTopics({
    topics: [
      {
        topic: "driver-updates",
        numPartitions: 4,
        replicationFactor: 1
      },
      {
        topic: "customer-updates",
        numPartitions: 2,
        replicationFactor: 1
      }
    ]
  });
  log("Topics created...");

  log("Disconnecting admin...");
  await broker.disconnect();
  log("Admin disconnected...");
};

initAdmin();
