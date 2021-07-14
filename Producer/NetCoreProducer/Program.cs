using System;
using Confluent.Kafka;

namespace NetCoreProducer
{
    class Program
    {
        //Kafkaya erişmek için Confluent.Kafka paketini kullanmalıyız
        static void Main(string[] args)
        {
            try{
                 var topicName="Logs";
            var kafkaUrl="172.24.144.1:9092";

            var config= new ProducerConfig(){
                BootstrapServers=kafkaUrl
            };

            using(var producer =new Producer<string,string>(config)) {
                while(true){
                    Console.WriteLine("Enter Message: ");
                    var text=Console.ReadLine();
                    
                    Message<string,string> msg=new Message<string, string>{
                        Value=text
                    };

                    DeliveryReport<string,string> result =producer.ProduceAsync(topicName,msg).GetAwaiter().GetResult();

                    Console.WriteLine("Mesaj "+result.TopicPartitionOffset+"--- topic e iletildi");
                }

            }
        }
            catch(Exception e){
                Console.WriteLine(e.Message);
            }
           
    }
    }
}
            
       
    

