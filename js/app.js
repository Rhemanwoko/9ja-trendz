let postWrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form')
let title = document.querySelector('#title')
let body = document.querySelector('#body')



let postBox = [];

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            console.log(postBox)
            //    console.log(data)
            postBox = data
            renderUI(postBox)
        })


}

getPosts();

postForm.addEventListener('submit', createPost)


function createPost(e) {
    e.preventDefault();
    // console.log(title.value, body.value)
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title.value,
            body: body.value,
            userId: 2
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postBox.unshift(data);
            console.log(postBox)
            let postHolder = '';
            postBox.forEach(post => {
                postHolder += `
                <div class="col-lg-4 col-md-6 col-12 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <div>
                                <p class="none-text">${post.id}</p>
                                <h6 class="text-uppercase fw-bold post-title">${post.title}</h6>
                                <p class="post-body">${post.body}</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-end">
                                <button class="btn btn-outline-dark" id="view-btn" onclick="openSingle(${post.id})">view<i class="fa-solid fa-eye fa-1x ms-1"></i></button>
                                <button class="btn btn-outline-success" onclick="updatePost(${post.id})">Update<i class="fa-solid fa-pen-to-square ms-1"></i></button>
                                <button class="btn btn-outline-danger" onclick="deletePost(${post.id})">Delete <i class="fa-solid fa-trash-can ms-1"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            `
            });
            postWrapper.innerHTML = postHolder;
        })
}


function updatePost(id) {
    console.log(id)

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title.value,
            body: body.value,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((data) => {

            console.log(data)
            let postTitles = document.querySelectorAll('.post-title') // 100 post titles [0 -99]
            let postBodies = document.querySelectorAll('.post-body')
            console.log(postTitles)
            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title
                    }
                }

            })

            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body
                    }
                }

            })

        });
}

function openSingle(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem('viewedPost', JSON.stringify(data))
            window.location.href = 'single.html'
            // console.log(data)
        });
}


function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postBox = postBox.filter(post => post.id !== id)
            console.log(postBox)
            // use a function to display the UI
            renderUI(postBox)  
        })

}

function renderUI (arr) {
    let postHolder = '';
            arr.forEach(post => {
                postHolder += `
                <div class="col-lg-4 col-md-6 col-12 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <div>
                                <p class="none-text">${post.id}</p>
                                <h6 class="text-uppercase fw-bold post-title">${post.title}</h6>
                                <p class="post-body">${post.body}</p>
                            </div>
                            <div class="d-flex justify-content-between align-items-end">
                                <button class="btn btn-outline-dark" id="view-btn" onclick="openSingle(${post.id})">view<i class="fa-solid fa-eye fa-1x ms-1"></i></button>
                                <button class="btn btn-outline-success" onclick="updatePost(${post.id})">Update<i class="fa-solid fa-pen-to-square ms-1"></i></button>
                                <button class="btn btn-outline-danger" onclick="deletePost(${post.id})">Delete <i class="fa-solid fa-trash-can ms-1"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                `
            });
            postWrapper.innerHTML = postHolder;

}
