
const getLocal = parseInt(localStorage.getItem('contador'))

let counter;
if(getLocal){
    counter = getLocal;
}
else{
    counter = 0;
}

const btnAgregar = document.getElementById('agregar')
const ul = document.getElementById('lista')

    btnAgregar.addEventListener('click', ()=>{
        counter+= 1
        const li = document.createElement('li')
        li.setAttribute('class' , `li`)
        li.setAttribute('id' , `li_${counter}`)
        li.innerHTML = `Desafio ${counter}  ✅`
        ul.appendChild(li)
        localStorage.setItem('contador' , counter)
        
    })

    const listar = () =>{

        for (let i = 1; i <= getLocal; i++) {
            const li = document.createElement('li')
            li.setAttribute('class' , `li`)
            li.setAttribute('id' , `li_${i}`)
            li.innerHTML = `Desafio ${i}  ✅`
            ul.appendChild(li)
        }
    }


if(getLocal){
    listar()
}


















