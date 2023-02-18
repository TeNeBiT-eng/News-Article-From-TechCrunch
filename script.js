const postList = document.querySelector('.post-list');

async function fetchPosts() {
  try {
    const response = await fetch('https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

function createPostCard(post) {
    const postCard = document.createElement('a');
    postCard.setAttribute('href', post.link);
    postCard.setAttribute('target', '_blank');
    postCard.setAttribute('rel', 'noopener noreferrer');
    postCard.classList.add('post-card');
  
    const postImage = document.createElement('div');
    postImage.style.background = `url(${post.jetpack_featured_media_url})`;
    postImage.style.backgroundImage = `url(${post.jetpack_featured_media_url})`;
    postImage.classList.add('post-image');
    postCard.appendChild(postImage);
  
    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
  
    const postTitle = document.createElement('h2');
    postTitle.classList.add('post-title');
    postTitle.innerText = post.title.rendered;
    postContent.appendChild(postTitle);
  
    const postExcerpt = document.createElement('p');
    postExcerpt.classList.add('post-excerpt');
    postExcerpt.innerHTML = post.excerpt.rendered.replace(/(<([^>]+)>)/gi, "");
    postContent.appendChild(postExcerpt);
  
    postCard.appendChild(postContent);
  
    return postCard;
  }
  


async function renderPostList() {
  postList.innerHTML = '<div class="loader">Loading...</div>';

  const posts = await fetchPosts();

  if (!posts || posts.length === 0) {
    postList.innerHTML = '<div class="error">No posts found.</div>';
    return;
  }

  postList.innerHTML = '';

  posts.forEach(post => {
    const postCard = createPostCard(post);

    postCard.addEventListener('mouseenter', () => {
      postCard.classList.add('hover');
    });

    postCard.addEventListener('mouseleave', () => {
      postCard.classList.remove('hover');
    });

    postList.appendChild(postCard);
  });
}

renderPostList();
