
let myForm = document.querySelector('.myForm');
let nameInput = document.querySelector('#name');
let emailInput = document.querySelector('#email');
let userDetail = document.querySelector('#userDetail');
let phoneInput = document.querySelector('#phoneno');
// let msg = document.querySelector('.msg');

myForm.addEventListener('submit', onSubmit);

userDetail.addEventListener('click', deleteData);

userDetail.addEventListener('click', editData);

window.addEventListener('DOMContentLoaded', showAllOnBrowser);


function showAllOnBrowser(event) {
    event.preventDefault();
    axios.get('https://crudcrud.com/api/992ca9e7291b4bb09aa3a4b8fca3947f/userData')
        .then((res) => {
            console.log(res);
            for (let i = 0; i < res.data.length; i++) {
                showOnBrowser(res.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}


function onSubmit(event) {
    event.preventDefault();
    if (nameInput.value === '' || emailInput.value === '' || phoneInput.value === '') {
        // msg.classList.add('error');
        // msg.innerHTML = 'Please enter all fields';

        // creating error element
        let msg = document.createElement("div");
        msg.className = "error";
        msg.appendChild(document.createTextNode("Please enter all fields"));
        let label = document.querySelector('label[for="name"]');
        myForm.insertBefore(msg, label);
        setTimeout(() => msg.remove(), 2000);
    }
    else {

        let userData = {
            'Name': nameInput.value,
            'Email': emailInput.value,
            'Phone': phoneInput.value
        };

        // Storing data using axios POST request
        axios.post('https://crudcrud.com/api/992ca9e7291b4bb09aa3a4b8fca3947f/userData', userData)
            .then((res) => {
                showOnBrowser(userData);
                console.log(res);
            })
            .catch((err) => {
                document.body.innerHTML = document.body.innerHTML + "<h4 class='error'>Something went wrong</h4>";
                console.log(err);
            });

        //Storing object in localStorage with multiple users
        // localStorage.setItem(emailInput.value, JSON.stringify(userData));

        //clearing fields
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    }
}

function showOnBrowser(user) {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('input');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.className = 'btn marginLeft delete';
    deleteBtn.setAttribute('value', 'Delete');
    const editBtn = document.createElement('input');
    editBtn.setAttribute('type', 'button');
    editBtn.className = "btn marginLeft edit";
    editBtn.setAttribute('value', 'Edit');
    li.appendChild(document.createTextNode(`${user.Name}:${user.Email}:${user.Phone}`));
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    userDetail.appendChild(li);
}

function deleteData(event) {
    event.preventDefault();
    if (event.target.classList.contains('delete')) {

        let li = event.target.parentElement.textContent.split(":");
        axios.get("https://crudcrud.com/api/992ca9e7291b4bb09aa3a4b8fca3947f/userData")
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].Email === li[1]) {
                        let url = "https://crudcrud.com/api/992ca9e7291b4bb09aa3a4b8fca3947f/userData/"+res.data[i]._id;
                        axios.delete(url)
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((error) => console.log(error));
                        let listIt = event.target.parentElement;
                        userDetail.removeChild(listIt);
                    }
                }
            })
            .catch((error)=>console.log(error));
    }
}

function editData(event) {
    event.preventDefault();
    if (event.target.classList.contains('edit')) {
        let li = event.target.parentElement.textContent.split(":");
        nameInput.value = li[0];
        emailInput.value = li[1];
        phoneInput.value = li[2];
        axios.get("https://crudcrud.com/api/992ca9e7291b4bb09aa3a4b8fca3947f/userData")
        .then((res)=>{
            for(let i=0;i<res.data.length;i++){
                if(res.data[i].Email===li[1]){
                    let url = "https://crudcrud.com/api/992ca9e7291b4bb09aa3a4b8fca3947f/userData/"+res.data[i]._id;
                    axios.delete(url)
                    .then(res=>console.log(res))
                    .catch(err=>console.log(err));
                    userDetail.removeChild(event.target.parentElement);
                }
            }






            // for(let i=0;i<res.data.length;i++){
            //     if(res.data[i].Email===li[1]){
            //         let url = "https://crudcrud.com/api/992ca9e7291b4bb09aa3a4b8fca3947f/userData/"+res.data[i]._id;
            //         axios.put(url,{
            //             Name:nameInput.value,
            //             Email:emailInput.value,
            //             Phone:phoneInput.value
            //         })
            //         .then((res)=>console.log(res))
            //         .catch((err)=>console.log(err));
            //         userDetail.removeChild(event.target.parentElement);
            //     }
            // }
        }).catch((err)=>console.log(err));
    }
}