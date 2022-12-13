
## Tener en cuenta para deployment:

Se recomienda administrar el proceso con pm2 para tener estabilidad en el servidor.
Se recomienda vincular mediante proxy inverso con nginx

## Comandos a ejecutar:
Se debe ejecutar npm install
Se debe configurar la base de datos en el archivo example.env
se debe renombrar example.env a .env
Se debe ejecutar el comando npm run init (solo una única vez)
Se debe ejecutar el comando npm run server o su homologo ( node server.js )

Nota: Si se hacen ajustes en el .env se debe reiniciar el servidor para que este tome los cambios actuales del archivo.

Adicionalmente en el .env se puede especificar el puerto en el que se desea arrancar el servidor.
