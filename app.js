const getData = (searchQuery) => {
    fetch(`http://www.splashbase.co/api/v1/images/search?query=${searchQuery}`)
    .then(response => response.json())
    .then(data => data.images)
    .then(images => createImages(images))
}

const showModal = (imgUrl) => {
    const prevModal = document.querySelector('.modal')
    console.log(prevModal)
    if(prevModal){
        prevModal.remove()
    }

    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.setAttribute('tabindex', '-1')
    modal.id = "exampleModal"
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Your image</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img class="img-fluid" src=${imgUrl}>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `

    const main = document.querySelector('main')
    main.appendChild(modal)
}

const createImages = (data) => {
    console.log(data.map(element => element.url))

    let container = document.querySelector('.album > .container')
    container.childNodes[0].remove()

    let row = document.createElement('div')
    row.classList.add('row')

    data.forEach(image => {
        let card = document.createElement('div')
        card.classList.add('col-md-4')
        
        card.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img class="card-img-top" src=${image.url}>
                <div class="card-body">
                    <p class="card-text">
                        This is a wider card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit
                        longer.
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        </div>
                        <small class="text-muted">${image.id}</small>
                    </div>
                </div>
            </div>
        `
        // add view and hide buttons
        const view = document.createElement('button')
        view.type = 'button'
        view.classList.add('btn', 'btn-sm', 'btn-outline-secondary')
        view.setAttribute('data-toggle', 'modal')
        view.setAttribute('data-target', '#exampleModal')
        view.innerText = 'View'
        view.addEventListener('click', (e) => {
            showModal(e.path[5].childNodes[1].childNodes[1].src)
        })
        card.childNodes[1].childNodes[3].childNodes[3].childNodes[1].appendChild(view)


        const hide = document.createElement('button')
        hide.type = 'button'
        hide.classList.add('btn', 'btn-sm', 'btn-outline-secondary')
        hide.innerText = 'Hide'
        hide.addEventListener('click', (e) => {
            e.path[5].remove()
        })
        card.childNodes[1].childNodes[3].childNodes[3].childNodes[1].appendChild(hide)
        // add view and hide buttons

        row.appendChild(card)
    });
    container.appendChild(row)
}

window.onload = () => {
    const buttons = document.querySelectorAll('.jumbotron p a')

    randomQueries = ['mountains', 'sun', 'water', 'sky']
    buttons[0].addEventListener('click', () => {
        getData(randomQueries[Math.floor(Math.random()*randomQueries.length)])
    })


    buttons[1].addEventListener('click', () => {
        const input = document.querySelector('input')
        const inputValue = input.value
        input.value = ''
        console.log(inputValue, !inputValue)
        if(!inputValue) {
            getData(randomQueries[Math.floor(Math.random()*randomQueries.length)])
        } else {
            getData(inputValue)
        }
    })

    
    fetch("http://www.splashbase.co/api/v1/images/search?query=forest")
    .then(response => response.json())
    .then((data) => {
        const dataNew = data.images.filter(img => !(img.url.includes('unsplash')))

        const lastCarousel = document.getElementsByClassName("carousel-inner")[0];
        for (let i = 0; i < dataNew.length; i++) {
            const div = document.createElement("div");
            if(i === 0) {
                div.className = "carousel-item active";
            } else {
                div.className = "carousel-item";
            }
            const img = document.createElement("img")
            img.className = "d-block w-100"
            img.src = `${dataNew[i].url}`;
            div.appendChild(img)
            lastCarousel.appendChild(div);
        }
    });
}