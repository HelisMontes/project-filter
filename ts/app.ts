import {autos, auto_type} from "./db"

const dataForm:any = {
    marca: document.querySelector("#marca"),
    year: document.querySelector("#year"),
    minimo: document.querySelector("#minimo"),
    maximo: document.querySelector("#maximo"),
    puertas: document.querySelector("#puertas"),
    transmision: document.querySelector("#transmision"),
    color: document.querySelector("#color"),
    resultado: document.querySelector("#resultado")
}; Object.freeze(dataForm);

type dataSelect = {
    marca:string,
    year:number,
    minimo:number,
    maximo:number,
    puertas:number,
    transmision:string,
    color:string
}

const objDataSelect:dataSelect = {
    marca: "",
    year: 0,
    minimo:0,
    maximo: 0,
    puertas: 0,
    transmision: "",
    color: ""
}

const yearMax:number = new Date().getFullYear();
const yearMin:number = yearMax -10;

document.addEventListener("DOMContentLoaded", ()=>{
    uploadAuto(autos);
    loadSelect();
})

dataForm.marca.addEventListener('change',()=>{
    objDataSelect.marca = dataForm.marca.value;
    filterAuto();
})

dataForm.year.addEventListener('change',()=>{
    objDataSelect.year = Number(dataForm.year.value);
    filterAuto();
})

dataForm.minimo.addEventListener('change',()=>{
    objDataSelect.minimo = Number(dataForm.minimo.value);
    filterAuto();
})
dataForm.maximo.addEventListener('change',()=>{
    objDataSelect.maximo = Number(dataForm.maximo.value);
    filterAuto();
})

dataForm.puertas.addEventListener('change',()=>{
    objDataSelect.puertas = Number(dataForm.puertas.value);
    filterAuto();
})
dataForm.transmision.addEventListener('change',()=>{
    objDataSelect.transmision = dataForm.transmision.value;
    filterAuto();
})
dataForm.color.addEventListener('change',()=>{
    objDataSelect.color = dataForm.color.value;
    filterAuto();
})

const uploadAuto = (autos):void => {
    autos.map(autos =>{
        const uploadHMTL:any = document.createElement('p')
        const { marca, modelo, year, precio, puertas, color, transmision } = autos
        uploadHMTL.textContent = `
            Marca ${marca} Modelo ${modelo} - Año ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color} 
        `;
        dataForm.resultado.appendChild(uploadHMTL);
    })
}
const loadSelect = ():void => {
    for (let i = yearMax; i >= yearMin; i--) {
        const selectYear:any = document.createElement('option');
        selectYear.value = i;
        selectYear.textContent = i;
        dataForm.year.appendChild(selectYear);
    }
} 

const removeHTML = ():void =>{
    while(dataForm.resultado.firstChild){
        dataForm.resultado.removeChild(dataForm.resultado.firstChild)
    }
}

const filterAuto = ():void =>{
    removeHTML()
    const result:auto_type[] = autos.filter(filterMarca).filter(filterYear).filter(filterMax).filter(filterMin).filter(filterPuertas).filter(filterTransmision).filter(filterColor)
        if (result) {
            uploadAuto(result)
        } else {
            mostrarError();     
        }
}

const mostrarError = () => {
    const error:any = document.createElement('div');
    error.classList.add('alerta', 'error');
    error.textContent = 'No hay Resultados';
    dataForm.resultado.appendChild(error);
}

const filterMarca = (auto) => {
    const { marca } = objDataSelect
    if(marca){
        return auto.marca === marca;
    }
    return auto;
}

const filterYear = (auto) => {
    const {year} = objDataSelect
    if(year){
        return auto.year === year;
    }
    return auto;
}

const filterMin = (auto) => {
    const {minimo} = objDataSelect
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

const filterMax = (auto) => {
    const {maximo} = objDataSelect
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}
const filterPuertas = (auto) => {
    const { puertas } = objDataSelect;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}
const filterTransmision = (auto) => {
    const { transmision } = objDataSelect;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}

const filterColor = (auto) => {
    const { color } = objDataSelect;
    if (color) {
        return auto.color === color;
    }
    return auto;
}