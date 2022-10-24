const editPostHandler = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    const postResponse = await fetch('/api/post/' + id, {
        method: 'PUT',
        body: JSON.stringify({title, content }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (postResponse.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(postResponse.statusText);
    }
};

document.getElementById('editPostForm').addEventListener('submit', editPostHandler);