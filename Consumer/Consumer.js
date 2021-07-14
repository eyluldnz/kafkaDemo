const { Kafka } = require("kafkajs");

createConsumer();

async function createConsumer() {
    try {
        const kafka = new Kafka({
            clientId: "kafka_kk_ornek",
            brokers: ["172.24.144.1:9092"] //topiclerin bulunduğu yerdir.container içinde bir tane var

        });

        const consumer = kafka.consumer({
            groupId:"consumer_group_1",
             
        });

        await consumer.connect();

        //Consumer subscribe olmalıdır.

        await consumer.subscribe({
            topic:"Logs",
            fromBeginning:true //baştan okumaya başlamak için 

        })

        await consumer.run({
            eachMessage: async result=>{
                console.log("Gelen mesaj:"+ result.message.value);
            }
        })

        
    }
    catch(_e){
        console.log(_e.message);
    }
}

