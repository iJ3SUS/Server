import fs from 'fs'
import path from 'path'

export default async function modules(route : string){

    const files : any = []

    const directories = fs.readdirSync( route )

    for(let filename of directories){

        const file = path.join( route, filename )

        const stats = fs.statSync( file )

        if(!stats.isDirectory()){

            const regex = /^.+?-module\..+$/

            if(regex.test( filename )){

                const module = await import(file)

                files.push( module )

            }

            continue
        
        }

        const result = await modules( file )

        result.forEach( (i : any) => files.push( i ) )
    
    }


    return files

} 