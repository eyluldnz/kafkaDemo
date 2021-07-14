const { Kafka } = require("kafkajs");

createTopic();

async function createTopic() {
    try {
        //İlk olarak bir connection üretilmesi gerekir.Kafkaya bağlanılacak. Admin Stuff..

        const kafka = new Kafka({
            clientId: "kafka_kk_ornek",
            brokers: ["172.24.144.1:9092"] //topiclerin bulunduğu yerdir.container içinde bir tane var

        });

        //admin oluşturulur

        const admin = kafka.admin();
        console.log("Kafka broker a bağlanıyor..");
        await admin.connect();
        console.log("Kafka broker a bağlandı...Topic üretimi başlatıldı.");
        await admin.createTopics({
            topics: [
                {
                    topic: "Logs",
                    numPartitions: 1
                },
                {
                    topic: "Logs2",
                    numPartitions: 2
                }
            ]
        });

        console.log("Topic oluşturuldu.");
        await admin.disconnect()
            ;

    }
    catch (err) {
        console.log(err);
    }
    finally {
        process.exit(0);
    }




}