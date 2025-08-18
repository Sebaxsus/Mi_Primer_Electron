const axios = require('axios')

const BASEURL = 'http://127.0.0.1'
class ConexionServer {
    /**
     * Recibe el objeto de el Archivo Local .json
     * Recibe la ultima fecha de Syncronizacion de el Servidor
     * La compara y con la fecha de los Registros de la Tabla Ahorros
     * Y sincroniza los datos necesarios
     * 
     * Devulve localData Actualizado para registrar que se sincronizo con el Servidor
     * @param {object} localData 
     * @returns {object} 
     */
    static async syncAhorros(localData) {
        try {
            console.log('Iniciando sincronización de datos')

            // Paso 1: Obteniendo el timestamp del último registro en el Servidor
            const res = await axios.get(
                `${BASEURL}/Ahorros`,{
                    headers: {
                        'Authorization': 'TOKEN/BASE64',
                    }
                }
            )
            // status = Codigo
            // statusText = 'Ok'
            // Validando si el servidor respondio correctamente
            if (res.status !== 200) {
                return new Error(`El servidor respondio con el Codigo de estado: ${res.status}`)
            }

            const { lastSyncedTimestamp } = res.data

            // Paso 2: Filtrar los datos locales que necesitan ser sincronizados
            const pendingRecords = localData.Ahorros.filter(
                record => record.syncStatus === 'pending' || new Date(record.timestamp) > new Date(lastSyncedTimestamp)
            )
            // Validando si hay registros para sincronziar
            if (pendingRecords.length === 0) {
                console.log('No hay nuevos registros para sincronizar.')
                return { success: true, message: 'No new records to sync.'}
            }

            // Paso 3: Enviar los datos faltantes al Servidor
            const syncRes = await axios.post(
                `${BASEURL}/Ahorros`,
                pendingRecords,
                {
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": 'TOKEN/BASE64',
                    }
                }
            )
            // Validando si se sincronizo correctamente
            if (syncRes.status !== 200) {
                return new Error(`Fallo la sincronización con el Codigo: ${res.status}`)
            }

            // Actualizando el estado de los registros locales a 'synced'
            localData.Ahorros.forEach(record => {
                record.syncStatus === 'pending' ? record.syncStatus = 'synced' : null
            });
            // Actualizando el TimeStamp de la Ultmia Sincronización
            localData.lastSyncedTimestamp = new Date().toISOString()
            // Devolviendo el Objeto actualizado
            return {
                success: true,
                message: `Sincronización exitosa, registros enviados: ${pendingRecords.length}`,
                localData,
            }

        } catch (err) {
             console.error("Fallo el get Mangas: ", err)
            // Para devolver la respuesta del servido debo acceder a la Propiedad "response"
            // Del objeto AxiosError, Ver el objeto Axios Error mas Abajo.
            return new Error(`Fallo la Sincronización con el Servidor:  ${err.response}`)
        }
    }
}

module.exports = {
    ConexionServer
}

// ################# OBJETO AXIOS ERROR
/*
{
    "message": "Request failed with status code 400",
    "name": "AxiosError",
    "stack": "AxiosError: Request failed with status code 400\n    at settle (http://localhost:5173/node_modules/.vite/deps/axios.js?v=362e8310:1218:12)\n    at XMLHttpRequest.onloadend (http://localhost:5173/node_modules/.vite/deps/axios.js?v=362e8310:1550:7)\n    at Axios.request (http://localhost:5173/node_modules/.vite/deps/axios.js?v=362e8310:2108:41)\n    at async animesController.postAnime (http://localhost:5173/src/services/newApi.js:111:25)\n    at async handleSubmit (http://localhost:5173/src/pages/Animes/AnimePost.jsx?t=1743576801757:78:25)",
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http",
            "fetch"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, * / *",
            "Content-Type": "application/json"
        },
        "method": "post",
        "url": "http://localhost:3000/animes",
        "data": "{\"title\":\"One Piece\",\"desc\":\"Esta historia se sitúa en el momento más álgido de la Gran Era de los Piratas, cuando el joven Monkey D. Luffy quiere llegar a ser el Rey de los Piratas y hacerse al fin con un legendario tesoro, el One Piece.\",\"img\":\"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTfccULK6AgKWW9SVSfl-ignZFu2ArX-sw5a-wgo55lnDdEXEbDpk3WYmwEMhc67Dud5ZswhqOuRrCeGOxyuY1DJqbiD5vI8Ru8-A2eUDtwjQ\",\"genre\":[\"Action\",\"Adventure\",\"Comedy\",\"Fantasy\"]}",
        "allowAbsoluteUrls": true
    },
    "request": {
        "m_isAborted": false
    },
    "response": {
        "data": {
            "message": "Error!, No se pudo crear el Anime",
            "error": [
                {
                    "received": "Comedy",
                    "code": "invalid_enum_value",
                    "options": [
                        "Drama",
                        "Action",
                        "Crime",
                        "Adventure",
                        "Sci-Fi",
                        "Romance",
                        "Isekai",
                        "Slice of Life"
                    ],
                    "path": [
                        "genre",
                        2
                    ],
                    "message": "Invalid enum value. Expected 'Drama' | 'Action' | 'Crime' | 'Adventure' | 'Sci-Fi' | 'Romance' | 'Isekai' | 'Slice of Life', received 'Comedy'"
                },
                {
                    "received": "Fantasy",
                    "code": "invalid_enum_value",
                    "options": [
                        "Drama",
                        "Action",
                        "Crime",
                        "Adventure",
                        "Sci-Fi",
                        "Romance",
                        "Isekai",
                        "Slice of Life"
                    ],
                    "path": [
                        "genre",
                        3
                    ],
                    "message": "Invalid enum value. Expected 'Drama' | 'Action' | 'Crime' | 'Adventure' | 'Sci-Fi' | 'Romance' | 'Isekai' | 'Slice of Life', received 'Fantasy'"
                }
            ]
        },
        "status": 400,
        "statusText": "Bad Request",
        "headers": {
            "content-length": "693",
            "content-type": "application/json; charset=utf-8"
        },
        "config": {
            "transitional": {
                "silentJSONParsing": true,
                "forcedJSONParsing": true,
                "clarifyTimeoutError": false
            },
            "adapter": [
                "xhr",
                "http",
                "fetch"
            ],
            "transformRequest": [
                null
            ],
            "transformResponse": [
                null
            ],
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "maxBodyLength": -1,
            "env": {},
            "headers": {
                "Accept": "application/json, text/plain, * /*",
                "Content-Type": "application/json"
            },
            "method": "post",
            "url": "http://localhost:3000/animes",
            "data": "{\"title\":\"One Piece\",\"desc\":\"Esta historia se sitúa en el momento más álgido de la Gran Era de los Piratas, cuando el joven Monkey D. Luffy quiere llegar a ser el Rey de los Piratas y hacerse al fin con un legendario tesoro, el One Piece.\",\"img\":\"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTfccULK6AgKWW9SVSfl-ignZFu2ArX-sw5a-wgo55lnDdEXEbDpk3WYmwEMhc67Dud5ZswhqOuRrCeGOxyuY1DJqbiD5vI8Ru8-A2eUDtwjQ\",\"genre\":[\"Action\",\"Adventure\",\"Comedy\",\"Fantasy\"]}",
            "allowAbsoluteUrls": true
        },
        "request": {
            "m_isAborted": false
        }
    }
    "code": "ERR_BAD_REQUEST",
    "status": 400
}
*/