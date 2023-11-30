import * as mqtt from 'mqtt';

const isProduction = process.env.NODE_ENV === 'production';

var mqttClient = null;

export const getMQTTClient = () => {
    if(!mqttClient) {
        mqttClient = mqtt.connect('mqtt://localhost:'+(isProduction?'8883':'1883'));
        
        mqttClient.on('connect', function () {
            console.log('Connected to MQTT');
        });

        mqttClient.on('reconnect', function () {
            console.log('Reconnecting to MQTT...');
        });

        mqttClient.on('offline', function () {
            console.log('MQTT disconnected');
        });

        mqttClient.on('error', function (error) {
            console.log('MQTT Error:', error);
        });
    }
    return mqttClient
}
