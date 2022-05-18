const keepers = []
const titleKeepers = []
const popKeepers = []
const ezCard = undefined;
const counter = []
//Grab info from db
const max = 150
const min = 3
let random = (Math.random() * (max-min) + min)
console.log(random)
for(let i =3; i < random; i++) {
    fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=d4cda60bbc10fd473970ba19b43e2e88&language=en-US`)
        .then(resp => resp.json())
        .then(function(obj){
            let a = []
            let b = null
            //filters out 404 errors coming from the api
            if(obj.status_code === 34){
                a.push(obj)
                while(a.length > 0){
                    a.pop()
                }
                return
            }
            else {
                b = obj
                keepers.push(obj) 
                counter.push(i)
            }
            //creates clones of first card
                const cardLocation = document.querySelector('#coolcard')
                const newCard = cardLocation.cloneNode(true)
                const ezCard = newCard
            function createCard(i){
                ezCard.id = `${i}`
                //inserts the ezCard clone after the cardLocation nodes
                cardLocation.after(ezCard)
                console.log(ezCard)
            }
            createCard(i)
            pictures(b, i)
            titles(b)
            desciptions(b)   
            pop(b)
            
            //deletes unecessary cards with no info populating
                const emptyTitle = ezCard.querySelector('.card-title')
                if (emptyTitle.innerHTML === 'Card title'){
                    return ezCard.style.display= 'none'
                }
            //Adds functionality to like and dislike buttons
                let likeButton = ezCard.querySelector('.btn.btn-outline-success')
                let dislikeButton = ezCard.querySelector('.btn.btn-outline-danger')
                let body = ezCard.querySelector('.card')
                let likeCount = 0
            //adds and removes highlight class to the cards
                likeButton.addEventListener('click', function () {
                    if (likeCount=== 0){
                        body.classList.add('highlight')
                        likeCount++
                    }
                    else{
                            body.classList.remove('highlight')
                            likeCount=0
                        }
                })
                dislikeButton.addEventListener('click', function(seeya){
                    return ezCard.remove()
                })
            //On mouseclick show card descriptions
                const descripLocation = ezCard.querySelector('.card-text')
                const popLocation = ezCard.querySelector('.popularity')
                const cardLocationNoButton = ezCard.querySelector('.card-title')
                const imgLocationNoButton = ezCard.querySelector('.card-img-top')
                let descripCounter = 0
                imgLocationNoButton.addEventListener('click', function(g){
                    if (descripCounter === 0){
                        descripLocation.style.display = 'block'
                        popLocation.style.display = 'block'
                        descripCounter++
                    }
                    else {
                        descripLocation.style.display = 'none'
                        popLocation.style.display = 'none'
                        descripCounter= 0
                    }
                })
                cardLocationNoButton.addEventListener('click', function(g){
                        if (descripCounter === 0){
                            descripLocation.style.display = 'block'
                            popLocation.style.display = 'block'
                            descripCounter++
                            
                        }
                        else {
                            descripLocation.style.display = 'none'
                            popLocation.style.display = 'none'
                            descripCounter= 0
                            
                        }
                })
            
        }
    )
}

//adds fxn to search bar
async function search() {
    document.querySelector('form').addEventListener('submit', (e) =>{
        e.preventDefault()

        const cards = document.getElementsByClassName('#coolcard')
        while(cards.length > 1){
            cards[1].parentNode.removeChild(cards[1])
        }

        //need to figure out a way to delete current cards on the DOM
        
        const keyword = e.target.searchbar.value
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=d4cda60bbc10fd473970ba19b43e2e88&language=en-US&query=${keyword}&page=1&include_adult=false`)
        .then(resp => resp.json())
        .then(function (obj){
            const results = obj.results
            for(let i =0; i<results.length; i++){
                const cardLocation = document.querySelector('#coolcard')
                const newCard = cardLocation.cloneNode(true)
                newCard.id = `${i}`
                cardLocation.after(newCard)
                
                pictures(results[i], i)
                titles(results[i])
                desciptions(results[i])   
                pop(results[i])

        //deletes unecessary cards with no info populating
            const emptyTitle = newCard.querySelector('.card-title')
            if (emptyTitle.innerHTML === 'Card title'){
                return newCard.style.display= 'none'
            }
        //Adds functionality to like and dislike buttons
            let likeButton = newCard.querySelector('.btn.btn-outline-success')
            let dislikeButton = newCard.querySelector('.btn.btn-outline-danger')
            let body = newCard.querySelector('.card')
            let newCount = 0
            body.classList.remove('highlight')
            //adds and removes highlight class to the cards
                likeButton.addEventListener('click', function () {
                    if (newCount=== 0){
                        body.classList.add('highlight')
                        newCount++
                    }
                    else{
                            body.classList.remove('highlight')
                            newCount=0
                        }
                })
            dislikeButton.addEventListener('click', function(seeya){
                return newCard.remove()
            })
        //On mouseclick show card descriptions
            const descripLocation = newCard.querySelector('.card-text')
            const cardLocationNoButton = newCard.querySelector('.card-body')
            const imgLocationNoButton = newCard.querySelector('.card-img-top')
            const popLocation = newCard.querySelector('.popularity')
            likeFirstCard()
            let descripCounter = 0
            imgLocationNoButton.addEventListener('click', function(g){
                if (descripCounter === 0){
                    descripLocation.style.display = 'block'
                    popLocation.style.display = 'block'
                    descripCounter++
                }
                else {
                    descripLocation.style.display = 'none'
                    popLocation.style.display = 'none'
                    descripCounter= 0
                }
        })
        
            cardLocationNoButton.addEventListener('click', function(g){
                    if (descripCounter === 0){
                        descripLocation.style.display = 'block'
                        popLocation.style.display = 'block'
                        descripCounter++
                        
                    }
                    else {
                        descripLocation.style.display = 'none'
                        popLocation.style.display = 'none'
                        descripCounter= 0
                        
                    }
            })
                }})
            })
}

//Inserts popularity
function pop(b){
    const cardPop = b.popularity
    const popArr = [cardPop]
    popKeepers.push(popArr)
    const popClass = document.querySelector('.popularity')
    popArr.forEach(function(e){
        popClass.textContent = 'Popularity rating: ' + e
    })
}
//Inserts pictures
function pictures(b, i){
    const cardPicture = b.backdrop_path
    const imgLocation = document.querySelector('.card-img-top')
    const cardPicArr = [cardPicture]
        cardPicArr.forEach(function() {
            imgLocation.src = 'https://image.tmdb.org/t/p/w300' + cardPicArr
            imgLocation.alt = i
        })
}
//Inserts titles
function titles(b){
    const cardTitle = b.original_title
            const titleArr = [cardTitle]
            const titleClass = document.querySelector('.card-title')
            titleArr.forEach(function(){
                titleClass.textContent = cardTitle
            })
}
//Inserts descriptions
function desciptions(b){
    const cardDescrip = b.overview
            const descripArr = [cardDescrip]
            const descripClass = document.querySelector('.card-text')
            descripArr.forEach(function(){
                descripClass.textContent = cardDescrip
            })
}
//likes the first card displayed, if removed the first card will not be able to be liked
function likeFirstCard() {
    let likeCounter = 0
    const likeButtons = document.querySelector('.btn.btn-outline-success')
    const cards = document.querySelector('#coolcard')
    let body = cards.querySelector('.card')
    body.classList.remove('highlight')
    likeButtons.addEventListener('click', function(e) {
        if(likeCounter === 0){
            body.classList.add('highlight')
            likeCounter++
            console.log(e)
        }
        else{
            body.classList.remove('highlight')
            likeCounter=0
        }
    })
}
//dislikes the first card, same reason as likeFirstCard()
function dislikeFirstCard() {
    const dislikeButtons = document.querySelector('.btn.btn-outline-danger')
    const cards = document.querySelector('#coolcard')
    dislikeButtons.addEventListener('click', function() {
        return cards.remove()
    })
}

function descriptionShow(){
    const descripLocation = document.querySelector('.card-text')
            const cardLocationNoButton = document.querySelector('.card-title')
            const imgLocationNoButton = document.querySelector('.card-img-top')
            const popLocation = document.querySelector('.popularity')
            let descripCounter = 0
            imgLocationNoButton.addEventListener('click', function(g){
                if (descripCounter === 0){
                    descripLocation.style.display = 'block'
                    popLocation.style.display = 'block'
                    descripCounter++
                }
                else {
                    descripLocation.style.display = 'none'
                    popLocation.style.display = 'none'
                    descripCounter= 0
                }
        })
            cardLocationNoButton.addEventListener('click', function(g){
                    if (descripCounter === 0){
                        descripLocation.style.display = 'block'
                        popLocation.style.display = 'block'
                        descripCounter++
                        
                    }
                    else {
                        descripLocation.style.display = 'none'
                        popLocation.style.display = 'none'
                        descripCounter= 0
                        
                    }
            })
}
function homePage() {
    const logo = document.querySelector('#logo')
    logo.addEventListener('click', (e) => window.location.reload(e))
}
likeFirstCard()
dislikeFirstCard()
descriptionShow()
search()
homePage()
const logo = document.querySelector('#logo')
logo.addEventListener('mouseenter', (e) => {
    e.target.style.fontSize = '24px'
})
logo.addEventListener('mouseleave', (e) => {
    e.target.style.fontSize = '20px'
})


//working on recommendation functionality
// function recommendations(i){
//     //recommendations
//     const reccBtn = newCard.querySelector('#recc')
//     reccBtn.addEventListener('click', function(e){
//         fetch(`https://api.themoviedb.org/3/movie/${i}/recommendations?api_key=d4cda60bbc10fd473970ba19b43e2e88&language=en-US&page=1`)
//         .then(resp => resp.json())
//         .then(function (obj) {
//             const results = obj.results
//             console.log(results)
//             for(let i=0; i<results.length; i++){
//                 const cardLocation = document.querySelector('.col-auto.mb-3')
//                 const newCard = cardLocation.cloneNode(true)
//                 newCard.id = `${i}`
//                 cardLocation.after(newCard)
//                 pictures(results[i], i)
//                 titles(results[i])
//                 desciptions(results[i])   
//                 pop(results[i])
//                 //deletes unecessary cards with no info populating
//                 const emptyTitle = newCard.querySelector('.card-title')
//                 if (emptyTitle.innerHTML === 'Card title'){
//                     return newCard.style.display= 'none'
//                 }
//             //Adds functionality to like and dislike buttons
//                 let likeButton = newCard.querySelector('.btn.btn-success')
//                 let dislikeButton = newCard.querySelector('.btn.btn-danger')
//                 let body = newCard.querySelector('.card')
//                 let likeCount = 0
//                 //adds and removes highlight class to the cards
//                     likeButton.addEventListener('click', function () {
//                         if (likeCount=== 0){
//                             body.classList.add('highlight')
//                             likeCount++
//                         }
//                         else{
//                                 body.classList.remove('highlight')
//                                 likeCount=0
//                             }
//                     })
//                 dislikeButton.addEventListener('click', function(seeya){
//                     return newCard.remove()
//                 })
//             //On mouseclick show card descriptions
//                 const descripLocation = newCard.querySelector('.card-text')
//                 const cardLocationNoButton = newCard.querySelector('.card-body')
//                 const imgLocationNoButton = newCard.querySelector('.card-img-top')
//                 const popLocation = newCard.querySelector('.popularity')

//                 let descripCounter = 0
//                 imgLocationNoButton.addEventListener('click', function(g){
//                     if (descripCounter === 0){
//                         descripLocation.style.display = 'block'
//                         popLocation.style.display = 'block'
//                         descripCounter++
//                     }
//                     else {
//                         descripLocation.style.display = 'none'
//                         popLocation.style.display = 'none'
//                         descripCounter= 0
//                     }
//             })
            
//                 cardLocationNoButton.addEventListener('click', function(g){
//                         if (descripCounter === 0){
//                             descripLocation.style.display = 'block'
//                             popLocation.style.display = 'block'
//                             descripCounter++
                            
//                         }
//                         else {
//                             descripLocation.style.display = 'none'
//                             popLocation.style.display = 'none'
//                             descripCounter= 0
                
//                         }
//                 })
//             }
//         }
//         )
//     })
// }
// recommendations()    
        
