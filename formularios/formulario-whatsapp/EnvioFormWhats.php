<?php
header("Access-Control-Allow-Origin: *");

/**
 * Función para cargar variables desde el archivo .env
 */
function cargarEnv($ruta) {
    if (!file_exists($ruta)) return false;
    
    $lineas = file($ruta, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lineas as $linea) {
        if (strpos(trim($linea), '#') === 0) continue; // Ignorar comentarios
        list($nombre, $valor) = explode('=', $linea, 2);
        $_ENV[trim($nombre)] = trim($valor);
    }
}

// Cargamos el .env (asumiendo que está en la misma carpeta que este script)
cargarEnv(__DIR__ . '../../.env');

require_once 'twilio-php/src/Twilio/autoload.php';
use Twilio\Rest\Client;

// Datos del formulario
$nombre   = $_POST['nome'] ?? 'Cliente';
$Prefijo  = $_POST['Prefijo'] ?? '';
$telefono = $_POST['telefone'] ?? '';

// Configuración de Twilio (Leída desde el .env)
$sid   = $_ENV['TWILIO_SID'] ?? '';
$token = $_ENV['TWILIO_TOKEN'] ?? '';
$from  = $_ENV['TWILIO_PHONE_FROM'] ?? '';
$to    = "whatsapp:+{$Prefijo}{$telefono}";

// Mensaje a enviar
$cuerpoMensaje = "Hola {$nombre}, gracias por cotizar con nosotros.";

try {
    // Envío del mensaje
    $client = new Client($sid, $token);
    $response = $client->messages->create($to, [
        'from' => $from, 
        'body' => $cuerpoMensaje
    ]);
    
    echo "Mensaje enviado con éxito. SID: " . $response->sid;
} catch (Exception $e) {
    echo "Error al enviar: " . $e->getMessage();
}
?>