const title = document.getElementById("titleForm");
const titleError = document.getElementById("titleError");
const year = document.getElementById("yearForm");
const yearError= document.getElementById("yearError");
const description= document.getElementById("descriptForm");
const descriptionError= document.getElementById("descriptError");



//Funciones para validar

function testStrings(strg){
    const regexp = new RegExp (/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9\s.,]+$/);
    return (regexp.test(strg));
}

function inputLength(input, minLength, maxLength){
    if (input.length < minLength || input.length > maxLength){
        return false;
    }else{
        return true;
    }
}

function requiredInput(strg){
    if (strg.trim() ===''){
        return false;
    }else{
        return true;
    }
}

function mostrarMensajeError(htmlElementMsg, msg)
{
    htmlElementMsg.innerText = msg;
    htmlElementMsg.style.backgroundColor= "red";
    htmlElementMsg.style.display = "block";
    validMovie = false;
}

function limpiarMensajeError(htmlElementMsg)
{
    htmlElementMsg.innerText = "";
    htmlElementMsg.style.display = "none";
    htmlElementMsg.style.backgroundColor= "transparent";

}


//Validate name

function validateTitle(strg){
    if (requiredInput(strg)){
        if(testStrings(strg)){        
            if(inputLength(title.value, 2, 50)){ 
                limpiarMensajeError(titleError);  
            } else {
                let mensaje="Este campo requiere entre 2 y 50 caracteres.";
                mostrarMensajeError(titleError,mensaje);
            }
        }
        else{
            let mensaje="El siguiente campo requiere algunos caracteres alfabeticos.";
            mostrarMensajeError(titleError,mensaje);
        }
    }else{   
        let mensaje="Este campo es Obligatorio.";
        mostrarMensajeError(titleError,mensaje);  
    }
}

//Validate year


function validateYear(num){
    let firstNum=num.slice(0,2)
    console.log(firstNum)
    console.log(typeof(firstNum))
    if (requiredInput(num)){
        if(inputLength(year.value, 4, 4)){
            if(firstNum === "19" || firstNum === "20"){ 
                limpiarMensajeError(yearError);  
            } else {
                let mensaje="El siguiente campo debe comenzar con 19 o 20.";
                mostrarMensajeError(yearError,mensaje); 
            }
        }else{
            let mensaje="Este campo requiere 4 caracteres.";
                mostrarMensajeError(yearError,mensaje);
        }
    }else{
        let mensaje="Este campo es Obligatorio.";
        mostrarMensajeError(yearError,mensaje);    
    }
}

//Validate Description

function validateDescription(strg){
    if (requiredInput(strg)){
        if((testStrings(strg))){  
            if(inputLength(strg, 20, 200)){
                limpiarMensajeError(descriptionError);  
            } else {
                let mensaje="Este campo requiere entre 20 y 200 caracteres.";
                mostrarMensajeError(descriptionError,mensaje);
            }
        }
        else{
            let mensaje="El siguiente campo requiere caracteres alfabeticos.";
            mostrarMensajeError(descriptionError,mensaje); 
        }
    }else{
        let mensaje="Este campo es Obligatorio.";
        mostrarMensajeError(descriptionError,mensaje);
    }
}


//Send

function submitMovie(e){
    validMovie=true;
    e.preventDefault();
    validateTitle(title.value);
    validateYear(year.value);
    validateDescription(description.value);
    
    if(validMovie){
        const movie={
            title: title.value,
            year: year.value,
           summary:description.value
        }
        saveMovie(movie);
    }
}

let btnAddMovie=document.getElementById("btnAddMovie");

btnAddMovie.addEventListener('click', submitMovie);


function cleanForm(){
    let inputsCollection=document.getElementsByTagName("input");
    let textareaCollection=document.getElementsByTagName("textarea");
    for (let index = 0; index < inputsCollection.length; index++) {
        inputsCollection[index].value="";
    }
    for (let index = 0; index < textareaCollection.length; index++) {
        textareaCollection[index].value="";
    }
}


function saveMovie(movie){
    var allMovies;
    if(localStorage.getItem('Movies')){
        allMovies= JSON.parse(localStorage.getItem('Movies'));
    }
    else{
        allMovies=[];
    }
    allMovies.push(movie);

    localStorage.setItem('Movies', JSON.stringify(allMovies));

    console.log(JSON.parse(localStorage.getItem('Movies')));

    alert("Se ha agregado una pelicula nueva");
    cleanForm();
}
