const inquirer = require('inquirer'); 
require('colors'); 

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,  
                name: `${ '1.'.green} Crear tarea`
            }, 
            {
                value: 2,
                name: `${ '2.'.green} Listar tareas`
            },
            {
                value: 3,
                name: `${ '3.'.green} Listar tareas completadas`
            },
            {
                value: 4,
                name: `${ '4.'.green} Listar tareas pendientes`
            },
            {
                value: 5,
                name: `${ '5.'.green} Completar tarea`
            },
            {
                value: 6,
                name: `${ '6.'.green} Borrar tarea`
            },
            {
                value: 0,
                name: `${ '0.'.green} Salir`
            }
        ]
    }
];


const inquirerMenu = async () => {

    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción   '.green);
    console.log('==========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas); 

    return opcion; 
}

const pausa = async () => {

    console.log();
    const QTpausa = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar.`
        }
    ]   

    return await inquirer.prompt(QTpausa); 
}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if(value.length === 0 ){    
                    return 'Por favor ingrese un valor'; 
                }
                return true; 
            }
        }
    ]

    const {desc} = await inquirer.prompt(question); 

    return desc;     
}

const listaTareasBorrar = async (tareas = []) => {

    const choices = tareas.map( ({id, desc}, i) => {
        
        const idx = `${i + 1}.`.green; 

        return {
            value: id,
            name: `${idx} ${desc}`
        } 
    }); 

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'borrar',
            choices
        }
    ]; 

    const {id} = await inquirer.prompt(question);
    
    return id; 
}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]; 

    const {ok} = await inquirer.prompt(question); 

    return ok; 
}

const seleccionarTareasChecklist = async (tareas = []) => {

    const choices = tareas.map(({id, desc, completadoEn}, i) => {
        let idx = `${i + 1}.`.green; 
        return {
            value: id,
            name: `${idx} ${desc}`,
            checkend:  (completadoEn) ? true : false 
        }
    })

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'selecciones',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(question); 

    return ids; 
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listaTareasBorrar,
    confirmar,
    seleccionarTareasChecklist
}