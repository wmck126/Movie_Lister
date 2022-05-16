/*
In order to populate info into the cards I need to:
    -Grab the information from the api (fetch GET)
    -Populate the information into the cards on the html sheet
        -Info:
            -genre
            -description
            -language
            -popularity rating
    -Provide event listeners for when a card is:
        -Liked (probably highlight the card)
        -Disliked (make card disappear)
        -clicked, show the movie description
*/

const keepers = []
const titleKeepers = []

//Grab info from db
for(let i =100; i < 105; i++) {
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
            
        }
        //creates clones of first card
            const cardArr = []
            const cardLocation = document.querySelector('.col-auto.mb-3')
            const newCard = cardLocation.cloneNode(true)
            newCard.id = `${i}`
            cardLocation.after(newCard)
            cardArr.push(newCard)
        //Pust pictures into each new card
            const cardPicture = b.backdrop_path
            const imgLocation = document.querySelector('.card-img-top')
            const cardPicArr = [cardPicture]
                cardPicArr.forEach(function() {
                    imgLocation.src = 'https://image.tmdb.org/t/p/w300' + cardPicArr
                    imgLocation.alt = i
                })
        //Puts each title from the fetch request into the card
            const cardTitle = b.original_title
            const titleArr = [cardTitle]
            const titleClass = document.querySelector('.card-title')
            titleArr.forEach(function(){
                titleClass.textContent = cardTitle
            })
        //Puts each description from fetch request into the card
            const cardDescrip = b.overview
            const descripArr = [cardDescrip]
            const descripClass = document.querySelector('.card-text')
            descripArr.forEach(function(){
                descripClass.textContent = cardDescrip
            })
        //Puts popularity rating into each card 
            const cardPop = b.popularity
            const popArr = [cardPop]
            popKeepers.push(popArr)
            const popClass = document.querySelector('.popularity')
            popArr.forEach(function(e){
                popClass.textContent = 'Popularity rating: ' + e
            })
        //deletes unecessary cards with no info populating
            const emptyTitle = newCard.querySelector('.card-title')
            if (emptyTitle.innerHTML === 'Card title'){
                return newCard.style.display= 'none'
            }
        //Adds functionality to like and dislike buttons
            let likeButton = newCard.querySelector('.btn.btn-success')
            let dislikeButton = newCard.querySelector('.btn.btn-danger')
            let body = newCard.querySelector('.card')
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
                return newCard.remove()
            })
        //On mouseclick show card descriptions
            const descripLocation = newCard.querySelector('.card-text')
            const cardLocationNoButton = newCard.querySelector('.card-body')
            const imgLocationNoButton = newCard.querySelector('.card-img-top')
            let descripCounter = 0
            imgLocationNoButton.addEventListener('click', function(g){
                if (descripCounter === 0){
                    descripLocation.style.display = 'block'
                    descripCounter++
                }
                else {
                    descripLocation.style.display = 'none'
                    descripCounter= 0
                }
        })
            cardLocationNoButton.addEventListener('click', function(g){
                    if (descripCounter === 0){
                        descripLocation.style.display = 'block'
                        descripCounter++
                        
                    }
                    else {
                        descripLocation.style.display = 'none'
                        descripCounter= 0
                        
                    }
            })

            // //Get recommendations for selected movie
            // const recommendationsBtn = newCard.querySelector('#recommendations')
            
            // titleKeepers.push(b.original_title)
            // //titleKeepers.shift()
            // console.log(titleKeepers)
            // recommendations(recommendationsBtn, i)







            }
        )
}
//likes the first card displayed, if removed the first card will not be able to be liked
function likeFirstCard() {
    let likeCounter = 0
    const likeButtons = document.querySelector('.btn.btn-success')
    const cards = document.querySelector('.col-auto.mb-3')
    let body = cards.querySelector('.card')
    likeButtons.addEventListener('click', function() {
        if(likeCounter === 0){
            body.classList.add('highlight')
            likeCounter++
        }
        else{
            body.classList.remove('highlight')
            likeCounter=0
        }
    })
}
//dislikes the first card, same reason as likeFirstCard()
function dislikeFirstCard() {
    const dislikeButtons = document.querySelector('.btn.btn-danger')
    const cards = document.querySelector('.col-auto.mb-3')
    dislikeButtons.addEventListener('click', function() {
        return cards.remove()
    })
}
function descriptionShow(){
    const descripLocation = document.querySelector('.card-text')
    const cardLocationNoButton = document.querySelector('.card-body')
    const imgLocationNoButton = document.querySelector('.card-img-top')
    let descripCounter = 0
            imgLocationNoButton.addEventListener('click', function(g){
                if (descripCounter === 0){
                    descripLocation.style.display = 'block'
                    descripCounter++
                }
                else {
                    descripLocation.style.display = 'none'
                    descripCounter= 0
                }
        })

            cardLocationNoButton.addEventListener('click', function(g){
                    if (descripCounter === 0){
                        descripLocation.style.display = 'block'
                        descripCounter++
                    }
                    else {
                        descripLocation.style.display = console.log(obj)
                    }})
}
likeFirstCard()
dislikeFirstCard()
descriptionShow()

// async function recommendations(recBtn, i){
//     const secondHeader = document.querySelector('h3')
//     recBtn.addEventListener('click', function(e){
//         console.log(e)
//         secondHeader.textContent = 'Recommendations for: ' + titleKeepers[i]
//     })

// }


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', (e) =>{
        e.preventDefault()
        
        const keyword = e.target.searchbar.value
        console.log(keyword)
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=d4cda60bbc10fd473970ba19b43e2e88&language=en-US&query=${keyword}&page=1&include_adult=false`)
        .then(resp => resp.json())
        .then(function (obj){
            const results = obj.results
            for(let i =0; i<results.length; i++){
                const cardArr = []
                const cardLocation = document.querySelector('.col-auto.mb-3')
                const newCard = cardLocation.cloneNode(true)
                newCard.id = `${i}`
                cardLocation.after(newCard)
                cardArr.push(newCard)

        //Puts pictures into each new card
            const cardPicture = results[i].backdrop_path
            const imgLocation = document.querySelector('.card-img-top')
            const cardPicArr = [cardPicture]
                cardPicArr.forEach(function() {
                    imgLocation.src = 'https://image.tmdb.org/t/p/w300' + cardPicArr
                    imgLocation.alt = i
                })
        //Puts each title from the fetch request into the card
            const cardTitle = results[i].original_title
            const titleArr = [cardTitle]
            const titleClass = document.querySelector('.card-title')
            titleArr.forEach(function(){
                titleClass.textContent = cardTitle
            })
        //Puts each description from fetch request into the card
            const cardDescrip = results[i].overview
            const descripArr = [cardDescrip]
            const descripClass = document.querySelector('.card-text')
            descripArr.forEach(function(){
                descripClass.textContent = cardDescrip
            })
        //Puts popularity rating into each card 
            const cardPop = results[i].popularity
            const popArr = [cardPop]
            popKeepers.push(popArr)
            const popClass = document.querySelector('.popularity')
            popArr.forEach(function(e){
                popClass.textContent = 'Popularity rating: ' + e
            })
        //deletes unecessary cards with no info populating
            const emptyTitle = newCard.querySelector('.card-title')
            if (emptyTitle.innerHTML === 'Card title'){
                return newCard.style.display= 'none'
            }
        //Adds functionality to like and dislike buttons
            let likeButton = newCard.querySelector('.btn.btn-success')
            let dislikeButton = newCard.querySelector('.btn.btn-danger')
            let body = newCard.querySelector('.card')
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
                return newCard.remove()
            })
        //On mouseclick show card descriptions
            const descripLocation = newCard.querySelector('.card-text')
            const cardLocationNoButton = newCard.querySelector('.card-body')
            const imgLocationNoButton = newCard.querySelector('.card-img-top')
            let descripCounter = 0
            imgLocationNoButton.addEventListener('click', function(g){
                if (descripCounter === 0){
                    descripLocation.style.display = 'block'
                    descripCounter++
                }
                else {
                    descripLocation.style.display = 'none'
                    descripCounter= 0
                }
        })
            cardLocationNoButton.addEventListener('click', function(g){
                    if (descripCounter === 0){
                        descripLocation.style.display = 'block'
                        descripCounter++
                        
                    }
                    else {
                        descripLocation.style.display = 'none'
                        descripCounter= 0
                        
                    }
            })
                }})
            })
            }
            
        )

