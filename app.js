const postsContainer = document.querySelector("#posts-container")
const loadercontainer = document.querySelector(".loader")
const filterInput = document.querySelector('#filter')

let page = 1

const getPosts = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)
    return response.json()
}
const generatePoststemplate = posts => posts.map(item => `
        <div class="post">
            <div class="number">${item.id}</div>
            <div class="post-info">
                <h2 class="post-title">${item.title}</h2>
                <p class="post-body"> ${item.body} </p>
            </div>
        </div>
    `).join("")
const addPostsInToDOM = async() => {
    const posts = await getPosts()
    const postsTemplate = generatePoststemplate(posts)
    postsContainer.innerHTML += postsTemplate
}

addPostsInToDOM()
const getNextsPosts = () =>  {
    setTimeout(() => {
        page++;
        addPostsInToDOM();
    }, 300);
    
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

const handleScrollToPageBottom = () => {
    const { clientHeight, scrollHeight, scrollTop } = document.documentElement
    const isPageBottomAlmostReached = scrollTop + clientHeight >= scrollHeight - 10
    if(isPageBottomAlmostReached){
        showLoader();
    }
}

window.addEventListener('scroll', handleScrollToPageBottom)

const showPostIfMatchInputValue = inputValue => (post) => {
    const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
    const postBody = post.querySelector('.post-body').textContent.toLowerCase()
    const postContainsInputValue = postTitle.includes(inputValue) 
        || postBody.includes(inputValue)
    
    if(postContainsInputValue){
        post.style.display = 'flex';
        return;
    } 
    post.style.display = 'none';
    
}

const handleInputValue = (event) => {
    const inputValue = event.target.value
    const posts = document.querySelectorAll('.post')
    posts.forEach( showPostIfMatchInputValue(inputValue))
}


filterInput.addEventListener('input', handleInputValue)