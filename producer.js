const { kafka, log } = require("./helper");

const initProducer = async () => {
  const producer = kafka.producer({
    allowAutoTopicCreation: true
  });

  await producer.connect();

  // Push driver location updates every second
  let distance = Math.ceil(Math.random() * 10) + 5;

  const updatesInterval = setInterval(async () => {
    await producer.send({
      topic: "driver-updates",
      messages: [
        {
          key: "location",
          value:
            distance > 0 ? `${distance} min away` : "Driver in at pick up point"
        }
      ]
    });

    if (distance <= 0) {
      clearInterval(updatesInterval);
      await producer.disconnect();

      log(`Closing the producer`);
    }

    distance -= 1;
  }, 1000);
};

initProducer();
