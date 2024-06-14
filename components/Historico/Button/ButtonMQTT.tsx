import { useSignal } from "@preact/signals";
import ModalConfirm from "deco-sites/cadeachavefacens/components/Modal/ModalConfirm.tsx";
import Loading from "deco-sites/cadeachavefacens/components/Modal/Loading.tsx";

export interface Props {
  isOpen?: boolean;
  nome: string;
}

export default function ButtonMQTT({ isOpen, nome }: Props) {
  const modal = useSignal<boolean>(false);
  const modalstatus = useSignal<"loading" | null>(null);

  // deno-lint-ignore no-explicit-any
  function loadScript(url: string, callback: any) {
    const script = document.createElement("script");
    script.src = url;
    script.onload = callback;
    document.head.appendChild(script);
  }

  function ButtonActiveMQTT() {
    const mqttScriptUrl =
      "https://cdnjs.cloudflare.com/ajax/libs/mqtt/4.2.7/mqtt.min.js";

    loadScript(mqttScriptUrl, function () {
      // Configurações do broker MQTT
      const mqtt_broker = "wss://test.mosquitto.org:8081"; // Websocket para comunicação segura
      const topic = `CADEACHAVE/SALA/${nome}`;

      // Cria um cliente MQTT
      const client = mqtt.connect(mqtt_broker);

      // Callback chamado quando o cliente se conecta ao broker
      client.on("connect", function () {
        console.log("Conectado ao broker MQTT");
        // Publica a mensagem no tópico MQTT
        client.publish(topic, "1");
        // Desconecta do broker após enviar a mensagem
        client.end();
      });

      // Callback chamado quando ocorre um erro de conexão
      // deno-lint-ignore no-explicit-any
      client.on("error", function (error: any) {
        console.error("Erro de conexão:", error);
      });
    });

    modalstatus.value = null;
  }

  return (
    <>
      {isOpen
        ? (
          <button
            class="text-black font-semibold px-2 py-1 rounded-lg bg-[#ec6666]"
            onClick={() => {
              modal.value = true;
            }}
          >
            Fechar Remoto
          </button>
        )
        : (
          <button
            class="text-black font-semibold px-2 py-1 rounded-lg bg-[#58cd68]"
            onClick={() => {
              modal.value = true;
            }}
          >
            Abrir Remoto
          </button>
        )}
      {modal.value && modalstatus.value === null &&
        (
          <ModalConfirm
            title={isOpen ? "Deseja Fechar a Sala:" : "Deseja Abrir a Sala:"}
            name={nome}
            buttonYes={() => ButtonActiveMQTT()}
            buttonNot={() => modal.value = false}
          />
        )}
      {modalstatus.value === "loading" && <Loading />}
    </>
  );
}
