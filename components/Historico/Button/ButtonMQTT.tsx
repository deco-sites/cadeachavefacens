import { Client } from "https://deno.land/x/mqtt@0.1.2/deno/mod.ts";

export interface Props {
  isOpen?: boolean;
  id: number;
}

export default function ButtonMQTT({ isOpen, id }: Props) {
  function ButtonActiveMQTT() {
    // Configurações do broker MQTT
    const mqtt_broker = "wss://test.mosquitto.org:8081"; // Websocket para comunicação segura
    const topic = `CADEACHAVE/SALA/${id}`;

    // Cria um cliente MQTT
    const client = new Client({ url: mqtt_broker });

    // Callback chamado quando o cliente se conecta ao broker
    client.on("connect", function () {
      console.log("Conectado ao broker MQTT");
      // Publica a mensagem no tópico MQTT
      client.publish(topic, "1");
      // Desconecta do broker após enviar a mensagem
      client.disconnect();
    });

    // Callback chamado quando ocorre um erro de conexão
    // deno-lint-ignore no-explicit-any
    client.on("error", function (error: any) {
      console.error("Erro de conexão:", error);
    });
  }

  return (
    <>
      {isOpen
        ? (
          <button
            onClick={() => ButtonActiveMQTT()}
            class="text-black font-semibold px-2 py-1 rounded-lg bg-[#ec6666]"
          >
            Fechar Remoto
          </button>
        )
        : (
          <button
            onClick={() => ButtonActiveMQTT()}
            class="text-black font-semibold px-2 py-1 rounded-lg bg-[#58cd68]"
          >
            Abrir Remoto
          </button>
        )}
    </>
  );
}
