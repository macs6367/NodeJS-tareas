const fs = require('fs');

const ruta = './db/data.json';

const saveData = (data) => {
    fs.writeFileSync(ruta, JSON.stringify(data)); 
}

const leerDB = () => {
    if(!fs.existsSync(ruta)){
        return null; 
    }

    const info = fs.readFileSync(ruta, {encoding: 'utf-8'});
    
    return JSON.parse(info); 
}

module.exports  = {
    saveData,
    leerDB
}