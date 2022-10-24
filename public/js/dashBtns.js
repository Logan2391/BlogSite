// Delete one of the users posts
let deleteBtn = async (event) => {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const btnResponse = await fetch('/api/post/' + id, {
        method: 'DELETE'
    });
    if (btnResponse.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(btnResponse.statusText);
    }
};

//Adds delete button to all posts created by the user
for (let i = 0; i < document.querySelectorAll('.deleteBtn').length; i++) {
    const element = document.querySelectorAll('.deleteBtn')[i];

    element.addEventListener('click', deleteBtn);
    console.log(element)
}