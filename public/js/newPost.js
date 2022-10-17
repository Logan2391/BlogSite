const newPostHandler = async (event) => {

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    const postResponse = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (postResponse.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(postResponse.statusText);
    }
};


document.getElementById('newPostForm').addEventListener('submit', newPostHandler);