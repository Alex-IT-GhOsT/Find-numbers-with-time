'use strict'

let parent = document.querySelector('#parent');
let lev = document.querySelector('.lev')
let timer = document.querySelector('.timer')
let btn = document.createElement('button')
let btnStart = document.createElement('button')
let p = document.createElement('p')
let btnAgain = document.createElement('button')
let prescription = document.querySelector('.prescriptionMain')

start(2)
let time = 5;
let idTimer;
function startTimer(time){
    idTimer = setInterval(function(){ 
        timer.textContent = 'Время: ' + time + ' сек'
        if(time == 0){
            stopTimer(idTimer)
            p.textContent = 'Вы проиграли'
            lev.append(p)
            parent.classList.add('hide')
            btnAgain.textContent = 'Сыграть снова?'
            lev.append(btnAgain)
            btnAgain.addEventListener('click',function(){
                location.reload()
            })
        }
        time--
        console.log(time)
    },1000)
    return idTimer   
}
function stopTimer(){
    clearInterval(idTimer)
}

lev.append(btnStart)
parent.classList.add('hide')
btnStart.textContent = 'Начать игру'
btnStart.addEventListener('click',function(){
    prescription.classList.add('hide')
    startTimer(time)
    this.classList.add('hide')
    parent.classList.remove('hide') 
})

function start(size){
    active(build(parent,prepare(size)),size)
   

}

function gen(size){
    let res = [];
    for(let i=1; i<=size; i++){
        res.push(i)
    }
    return res
}

function shuffle(arr){
    return arr.map(i => [Math.random(),i]).sort().map(i => i[1])
}

function chuck(arr,n){
    let res = []
    let del = Math.ceil(arr.length / n)
    for(let i=0;i<del;i++){
        let el = arr.splice(0,n)
        res.push(el)
    }
    return res
}

function prepare(size){
    let arr = []

    arr = gen(size*size)
    arr = shuffle(arr)
    arr = chuck(arr,size)

    return arr
}

function build(parent, arr){
    parent.textContent = ''
    let res = []
    for(let num of arr){
        let tr = document.createElement('tr')

        for(let nn of num){
            let td = document.createElement('td')
            td.textContent = nn
            tr.appendChild(td)
            res.push(td)
        }
        parent.appendChild(tr)
    }
    return res
}

function active(cells,size){
    let lt = 5
    let count = 1
    for(let cell of cells){
        cell.addEventListener('click',function(){
            if(this.textContent == count){
                this.classList.add('active')

                if(count == size*size && time!=0){
                    
                    lev.textContent = 'Уровень ' + size
                    stopTimer(idTimer)
                    start(++size)
                    
                    startTimer(lt+=5)  
                    console.log(lt)
                }
                count++   
            }
            lt++ 
        }) 
    }
}



