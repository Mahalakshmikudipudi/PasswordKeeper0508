function handleFormSubmit(event) {
    event.preventDefault();

    const title=document.getElementById('title').value;
    const password=document.getElementById('password').value;

    const obj = {
        title,
        password
    };

    axios.post("https://crudcrud.com/api/920577de35934bc59d13b372c810229a/appointmentData", obj)
      .then((response) => {
        showUserOnScreen(response.data);
        //console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })

      localStorage.setItem("Passwords", JSON.stringify(obj));
      showUserOnScreen(obj);

      document.getElementById('title').value='';
      document.getElementById('password').value='';
}

function showUserOnScreen(obj) {
    const parentEle = document.getElementById('listOfItems');
    const childEle = document.createElement('li');
    childEle.textContent = obj.title + ' - ' + obj.password;

    const deleteBtn=document.createElement('input');
    deleteBtn.type='button';
    deleteBtn.value='Delete';
    deleteBtn.onclick = () => {
        localStorage.removeItem(obj.email);
        parentEle.removeChild(childEle);
    }

    childEle.appendChild(deleteBtn);
    parentEle.appendChild(childEle);

    const editBtn=document.createElement('input');
    editBtn.type='button';
    editBtn.value='Edit';
    editBtn.onclick = () => {
        localStorage.removeItem(obj.email);
        parentEle.removeChild(childEle);
        document.getElementById('title').value = obj.title;
        document.getElementById('password').value = obj.password;
        
    }


    childEle.appendChild(editBtn);
    parentEle.appendChild(childEle);

    
}

let addCount=0;

function addPassword() {
    const passwordInput=document.getElementById('password').value;
    addCount++;
    updatePasswordCount();


}
function updatePasswordCount() {
    document.getElementById('count').textContent = addCount;
}


const filter=document.getElementById('filter');

filter.addEventListener('keyup', function(e) {
    e.preventDefault();
    const textEnter = e.target.value.toLowerCase();
    const list=document.getElementById('listOfItems');

    for(let i=0;i<list.length;i++) {
        const currentList=list[i].firstChild.textContent.toLowerCase();
        if(currentList.indexOf(textEnter)===-1) {
            console.log(list[i].style.display='none');
        } else {
            console.log(list[i].style.display='');
        }
    }
});

