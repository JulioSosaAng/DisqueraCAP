const cds = require('@sap/cds');

module.exports = function () {
    const { Sesiones , Musicos } = this.entities;

    this.on("changeHours", async req =>{
        const { ID } = req.data;
        const sesion = await SELECT.from(Sesiones).where({ ID: ID });
        const promoHs = 2;
        if(sesion[0].horas >= 6){
            let agregarPromo = sesion[0].horas + promoHs;
            await UPDATE (Sesiones).set({horas:agregarPromo, promocion: true}).where({ ID: ID });
        }else {            
            console.log('Sesion no encontrada');
        }
      
    }),

    this.on("getMusician", async req =>{
        const { ID } = req.data;
        const musician_return = await SELECT.columns("nombre").from(Musicos).where({ ID: ID });

        if(musician_return){
            console.log(`El nombre del musico con ID ${ID} es ${musician_return[0].nombre}`);
        } else {
            console.log(`El ID ${ID} no ha sido encontrado`);
        }        
    })

}


