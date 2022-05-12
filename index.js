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
const popKeepers = []
//Grab info from db
for(let i =100; i < 155; i++) {
    fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=d4cda60bbc10fd473970ba19b43e2e88&language=en-US`)
    //fetch(`https://api.themoviedb.org/3/movie/153?api_key=d4cda60bbc10fd473970ba19b43e2e88&language=en-US`)
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
        const cardArr = []
        const cardLocation = document.querySelector('.col-auto.mb-3')
        const newCard = cardLocation.cloneNode(true)
        newCard.id = `${i}`
        cardLocation.after(newCard)
        cardArr.push(newCard)



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
            //popArr.push(popKeepers)
            const popClass = document.querySelector('.popularity')
            popArr.forEach(function(e){
                popClass.textContent = 'Popularity rating: ' + e
            })
            //Sorts popularity **Still need to figure out a way to sort cards by popularity on button press**
            const popButton = document.querySelector('#popularityBtn')
            popButton.addEventListener('click', function() {
                const elements = document.querySelector('.col-auto.mb-3')
                elements.remove()
                
                // const arr = Object.keys(cardPop).map(el =>{
                //     return cardPop[el]
                // })
                // arr.sort((e,f) => {
                //     return e - f
                // })
                // console.log(arr)
                // return arr
            })
            
                    
                
                
            let likeButton = newCard.querySelector('.btn.btn-success')
            let dislikeButton = newCard.querySelector('.btn.btn-danger')
            let body = newCard.querySelector('.card')
            let likeCount = 0
            //adds and removes highlight class to the cards
                likeButton.addEventListener('click', likeButtonHandler)
                function likeButtonHandler(event){
                        body.classList.add('highlight')
                        likeCount++
                        console.log(likeCount)
                        if (likeCount >= 1){
                            likeButton.addEventListener('click', () => {
                                body.classList.remove('highlight')
                                likeCount=0
                                console.log(likeCount)
                            })
                            
                        }
                    
                }
            dislikeButton.addEventListener('click', function(seeya){
                return newCard.remove()
            })
            
            }
        )
    }

//likes the first card displayed, if removed the first card will not be able to be liked
function likeFirstCard() {
    const likeButtons = document.querySelector('.btn.btn-success')
    const cards = document.querySelector('.col-auto.mb-3')
    let body = cards.querySelector('.card-body')
    likeButtons.addEventListener('click', function() {
        body.classList.add('highlight')
    })
}
//dislikes the first card, same reason as likeFirstCard()
function dislikeFirstCard() {
    const dislikeButtons = document.querySelector('.btn.btn-danger')
    const cards = document.querySelector('.col-auto.mb-3')
    let body = cards.querySelector('.card-body')
    dislikeButtons.addEventListener('click', function() {
        return cards.remove()
    })
}
function cardSorter() {
    const sorted = popKeepers.slice().sort((e,f)=>e-f)
    console.log(sorted)
}

console.log(popKeepers)
//sortPopularity()
likeFirstCard()
dislikeFirstCard()


