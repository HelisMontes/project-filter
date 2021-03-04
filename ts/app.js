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
document.addEventListener("DOMContentLoaded", () => {
    uploadAuto();
});
const uploadAuto = () => {
    autos.map(autos => {
        const uploadHMTL = document.createElement('p');
        const { marca, modelo, year, precio, puertas, color, transmision } = autos;
        uploadHMTL.textContent = `
            ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmisión ${transmision} - Precio: ${precio} - Color: ${color} 
        
        `;
        dataForm.resultado.appendChild(uploadHMTL);
    });
};
