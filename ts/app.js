const dataForm = {
    marca: document.querySelector("#marca"),
    year: document.querySelector("#year"),
    minimo: document.querySelector("#minimo"),
    maximo: document.querySelector("#maximo"),
    puertas: document.querySelector("#puertas"),
    transmision: document.querySelector("#transmision"),
    color: document.querySelector("#color"),
    resultado: document.querySelector("#resultado")
};
Object.freeze(dataForm);
const objDataSelect = {
    marca: "",
    year: 0,
    minimo: 0,
    maximo: 0,
    puertas: 0,
    transmision: "",
    color: ""
};
const yearMax = new Date().getFullYear();
const yearMin = yearMax - 10;
document.addEventListener("DOMContentLoaded", () => {
    uploadAuto(autos);
    loadSelect();
});
dataForm.marca.addEventListener('change', () => {
    objDataSelect.marca = dataForm.marca.value;
    filterAuto();
});
dataForm.year.addEventListener('change', () => {
    objDataSelect.year = Number(dataForm.year.value);
    filterAuto();
});
dataForm.minimo.addEventListener('change', () => {
    objDataSelect.minimo = Number(dataForm.minimo.value);
    filterAuto();
});
dataForm.maximo.addEventListener('change', () => {
    objDataSelect.maximo = Number(dataForm.maximo.value);
    filterAuto();
});
dataForm.puertas.addEventListener('change', () => {
    objDataSelect.puertas = dataForm.puertas.value;
});
dataForm.transmision.addEventListener('change', () => {
    objDataSelect.transmision = dataForm.transmision.value;
});
dataForm.color.addEventListener('change', () => {
    objDataSelect.color = dataForm.color.value;
});
const uploadAuto = (autos) => {
    autos.map(autos => {
        const uploadHMTL = document.createElement('p');
        const { marca, modelo, year, precio, puertas, color, transmision } = autos;
        uploadHMTL.textContent = `
            Marca ${marca} Modelo ${modelo} - Año ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color} 
        
        `;
        dataForm.resultado.appendChild(uploadHMTL);
    });
};
const loadSelect = () => {
    for (let i = yearMax; i >= yearMin; i--) {
        const selectYear = document.createElement('option');
        selectYear.value = i;
        selectYear.textContent = i;
        dataForm.year.appendChild(selectYear);
    }
};
const removeHTML = () => {
    while (dataForm.resultado.firstChild) {
        dataForm.resultado.removeChild(dataForm.resultado.firstChild);
    }
};
const filterAuto = () => {
    removeHTML();
    const result = autos.filter(filterMarca).filter(filterYear).filter(filterMax).filter(filterMin);
    uploadAuto(result);
};
const filterMarca = (auto) => {
    const { marca } = objDataSelect;
    if (marca) {
        return auto.marca === marca;
    }
    return auto;
};
const filterYear = (auto) => {
    const { year } = objDataSelect;
    if (year) {
        return auto.year === year;
    }
    return auto;
};
const filterMin = (auto) => {
    const { minimo } = objDataSelect;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
};
const filterMax = (auto) => {
    const { maximo } = objDataSelect;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
};
