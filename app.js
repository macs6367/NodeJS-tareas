const { inquirerMenu, pausa, leerInput, listaTareasBorrar, confirmar,seleccionarTareasChecklist} = require('./helpers/inquirer');
const { saveData, leerDB } = require('./helpers/saveData');
const Tareas = require('./models/tareas');

require('colors'); 

const main = async () => {
    
    let opt = ''; 

    const tareas = new Tareas; 
    const tareasDB = leerDB(); 

    if(tareasDB){
        tareas.guardarTareasArray(tareasDB);
    }

    do {
        opt = await inquirerMenu(); 
        
        switch (opt) {
            case 1:
                const desc = await leerInput('Descripción: '); 
                tareas.crearTarea(desc);
            break;
        
            case 2: 
                tareas.listarTareas(); 
            break; 

            case 3: 
                tareas.listarTareasCompletadas(true);
            break; 

            case 4: 
                tareas.listarTareasCompletadas(false);
            break; 

            case 5: 
                const ids = await seleccionarTareasChecklist(tareas.listadoArr);
                tareas.completarTareas(ids);
            break; 

            case 6: 
                const id = await listaTareasBorrar(tareas.listadoArr); 
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada')
                    }
                }
            break; 
        }
                
        saveData(tareas.listadoArr);

        await pausa(); 
    } while (opt !== 0);     
}

main(); 