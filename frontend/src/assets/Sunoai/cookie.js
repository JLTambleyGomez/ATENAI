import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'https://clerk.suno.com/v1/client/sessions/';
const COMMON_HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
  "Referer": "https://suno.com",
  "Origin": "https://suno.com"
};

class SunoCookie {
  constructor() {
    this.cookie = Cookies.get(); // Obtiene todas las cookies
    this.sessionId = process.env.REACT_APP_SESSION_ID; // Obtén el ID de sesión de tus variables de entorno
    this.token = null;
  }

  loadCookie() {
    this.cookie = Cookies.get();
  }

  getSessionId() {
    return this.sessionId;
  }

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;
  }
}

const sunoAuth = new SunoCookie();

async function updateToken() {
  const headers = {
    cookie: sunoAuth.cookie,
    ...COMMON_HEADERS
  };

  try {
    const response = await axios.post(`${BASE_URL}${sunoAuth.getSessionId()}/tokens`, {}, { headers });
    const newToken = response.data.jwt;
    sunoAuth.setToken(newToken);
    console.log("Token updated:", newToken);
  } catch (error) {
    console.error("Error updating token:", error);
  }
}

function keepAlive() {
  updateToken(); // Actualiza el token inmediatamente al iniciar
  setInterval(updateToken, 5000); // Actualiza el token cada 5 segundos
}

keepAlive(); // Inicia el proceso de actualización del token

export default sunoAuth; // Exporta la instancia de SunoCookie para usarla en otros archivos
