const newPostBtn = async (event) => {
    event.preventDefault();
    const btnResponse = await fetch("/new", {
        method: 'GET'
    });
    if (btnResponse.ok) {
        document.location.replace('/new');
    } else {
        alert(btnResponse.statusText);
    }
};

document.getElementById('newPostBtn').addEventListener('click', newPostBtn);
