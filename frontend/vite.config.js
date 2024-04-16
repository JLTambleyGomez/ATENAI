import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// //https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   define: {
//     'process.env': process.env,
//  },
// })

export default defineConfig(({ mode }) => {
  // Carga el archivo de entorno basado en mode en el directorio de trabajo actual.
  // Establece el tercer parámetro en '' para cargar todas 
  // las variables de entorno independientemente del prefijo VITE_.
  const env = loadEnv(mode, process.cwd(), '')
//   // Crea un objeto para definir las variables de entorno en la configuración de Vite
//  const definedEnv = {};

//  // Itera sobre las variables de entorno cargadas y las define en el objeto
//  for (const key in env) {
//     if (key.startsWith('VITE_')) {
//       definedEnv[`process.env.${key}`] = JSON.stringify(env[key]);
//     }
//  }
  return {
    plugins: [react()],
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})
