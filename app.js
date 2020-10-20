const postsContainer = document.querySelector("#posts-container")
const loadercontainer = document.querySelector(".loader")


let page = 1

const getPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
    return response.json()
}

const addPostsInToDOM = async() => {
    const posts = await getPosts()
    const postsTemplate = posts.map(item => `
    <div class="post">
        <div class="number">${item.id}</div>
        <div class="post-info">
            <h2 class="post-title">${item.title}</h2>
            <p class="post-body"> ${item.body} </p>
        </div>
    </div>
    `).join("")
    postsContainer.innerHTML += postsTemplate
}

addPostsInToDOM()
const getNextsPosts = () =>  {
    page++;
    addPostsInToDOM();
}
const removeLoader = () => {
    setTimeout(() => {
        loadercontainer.classList.remove("show")
        getNextsPosts();
    }, 1000)
}
const showLoader = () => {
    loadercontainer.classList.add("show")
    removeLoader();
}
window.addEventListener('scroll', () => {
        const { clientHeight, scrollHeight, scrollTop } = document.documentElement
        const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10
        if(isPageBottomAlmostReached){
            showLoader();
        }


    })
