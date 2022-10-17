const dashboardRender = async (event) => {
    event.preventDefault();

    const dashResponse = await fetch('/dashboard', {
        method: 'GET',
    });

    if (dashResponse.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(dashResponse.statusText);
    }
};

document.querySelector('#dashboardbtn').addEventListener('click', dashboardRender);
