
import { route, injectable } from '@root/core/decorators'

import exceljs from 'exceljs'

function sum(arrayDeObjetos : any, propiedad : any) {

    return arrayDeObjetos.reduce((acumulador : any, objeto : any) => {
      
        const valor = objeto[propiedad]

        if (valor !== null && valor !== '' && valor !== undefined) {
            // Sumar el valor válido al acumulador
            return acumulador + parseFloat(valor)
            
        }
        // Si el valor no es válido, simplemente retornar el acumulador sin cambios
        return acumulador

    }, 0)
  }

@injectable()
export default class Prueba{ 

    @route('GET', 'all')
    async index (request : any, reply : any) {

        const db = request.server.db

        const collection = db.collection('cuentas')

        return await collection.find({}).toArray()

    }

    @route('GET', ':id')
    async show (request : any, reply : any) {

        const db = request.server.db

        const collection = db.collection('cuentas')

        const item = await collection.findOne({
            _id: new request.server.util.objectId(request.params.id)
        })

        return item

    }

    @route('PUT', ':id')
    async edit (request : any, reply : any) {

        const db = request.server.db

        const collection = db.collection('cuentas')

        const item = await collection.updateOne({
            _id: new request.server.util.objectId(request.params.id)
        },{
            $set: request.body,
            $currentDate: { lastModified: true }
        })

        return item

    }

    @route('POST', 'save')
    async save (request : any, reply : any) {

        const db = request.server.db

        const collection = db.collection('cuentas')

        await collection.insertOne(request.body)

        return request.body

    }

    @route('DELETE', 'remove/:id')
    async remove (request : any, reply : any) {

        const db = request.server.db

        const collection = db.collection('cuentas')

        await collection.deleteOne({
            _id: new request.server.util.objectId(request.params.id)
        })

        return request.body

    }

    @route('GET', 'excel')
    async excel (request : any, reply : any) {

        const db = request.server.db

        const collection = db.collection('cuentas')

        const data = await collection.find({
            "furgon": request.query.furgon
        }).toArray()


        const workbook = new exceljs.Workbook()
        const worksheet = workbook.addWorksheet('Hoja1')
        //ADICIONAL 	TOTAL ANTICIPO Y ADICIONAL	 FLETE 	TOTAL GASTOS CREDITO	TOTAL OTROS	TOTAL EXCEDENTES	TOTAL ABONOS	SALDOS
        // Agregar contenido al archivo Excel
        worksheet.addRow(['FURGON', 'PLANILLA', 'FECHA', 'ORIGEN', 'DESTINO', 'ANTICIPO', 'ADICIONAL', 'TOTAL ANTICIPO Y ADICIONAL', 'FLETE', 'TOTAL GASTOS CREDITO', 'TOTAL OTROS', 'TOTAL EXCEDENTES', 'TOTAL ABONOS', 'SALDOS', 'LINK'])

        for (let item of data) {

            const element : any = item

            const anticipo = sum(element.complementos.filter( (i:any) => i.opcion == 'ANTICIPO' ), 'valor')

            const adicional = sum(element.complementos.filter( (i:any) => i.opcion == 'COMPLEMENTO' ), 'valor')

            const totalanticipoyadicional = sum(element.complementos, 'valor')

            const totalgastoscredito = sum(element.gastos.filter( (i:any) => i.tipo == 'COSTOS CREDITO' ), 'valor')

            const totalotros = sum(element.gastos.filter( (i:any) => i.tipo == 'OTROS GASTOS' ), 'valor')

            const totalexcedentes = sum(element.excedentes, 'valor')

            const totalabonos = sum(element.abonos, 'valor')

            const totalgastos = sum(element.gastos, 'valor')

            const saldos = totalanticipoyadicional + totalexcedentes - totalgastos - totalabonos
            //OTROS GASTOS
            worksheet.addRow([
                element.furgon,
                element.no,
                element.fecha,
                element.origen,
                element.destino,
                anticipo,
                adicional,
                totalanticipoyadicional,
                element.flete,
                totalgastoscredito,
                totalotros,
                totalexcedentes,
                totalabonos,
                saldos,
                "https://cuentas.idealabs.com.co/edit/"+element._id,                
            ])

        }

        worksheet.addRow([]);
        worksheet.addRow([]);
        worksheet.addRow([]);

        worksheet.addRow(['GASTOS'])

        worksheet.addRow(['PLANILLA', 'NIT', 'TERCERO', 'FECHA', 'CONCEPTO', 'DETALLE', 'TIPO FACTURA', 'FACTURA', 'VALOR', 'LINK'])

        for (let item of data) {

            const element : any = item

            const gastos = element.gastos.sort((a:any, b:any) => {
                const nombreA = a.detalle.toUpperCase()
                const nombreB = b.detalle.toUpperCase()
        
                if (nombreA < nombreB) {
                    return -1
                }
        
                if (nombreA > nombreB) {
                    return 1
                }
        
                return 0
            })

            for (let gasto of gastos) {

                worksheet.addRow([
                    element.no,
                    gasto.empresa,
                    gasto.razon_social,
                    gasto.fecha_factura,
                    gasto.concepto,
                    gasto.detalle,
                    gasto.tipo_factura,
                    gasto.factura,
                    gasto.valor,
                    "https://cuentas.idealabs.com.co/edit/"+element._id,
                ])
            }

        }

        // worksheet.addRow(['Ejemplo 2', 30])
    
        // Configurar la respuesta HTTP para descargar el archivo
        const buffer = await workbook.xlsx.writeBuffer()

        reply
          .header('Content-Disposition', 'attachment; filename=' + request.query.furgon + '.xlsx')
          .header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
          .send(buffer)

    }

}

export const prefix = 'cuentas'