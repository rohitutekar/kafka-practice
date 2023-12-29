const { kafka } = require("./helper");

const group = "rider-group";

const initConsumer = async () => {
  const consumer = kafka.consumer({
    groupId: group
  });

  await consumer.connect();

  await consumer.subscribe({
    topic: "driver-updates"
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `\x1b[33m ${group}: [${topic}]: PART:${partition}: \x1b[0m`,
        message.value.toString()
      );
    }
  });
};

initConsumer();
