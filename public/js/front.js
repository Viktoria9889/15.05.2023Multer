const info = document.querySelector('.info');
const formEl = document.querySelector('form');
let name;
let surname;
let arrdata;
let li;
let birthday;
let years;

const item = async () => {
    const result = await axios.get('/item')
}
item()


const infoUser = async () => {
    let error;
    if (!error) {
        arrdata = await axios.post('/infoUser', { name: name, surname: surname,  birthday: birthday, years: Number(years),});
        // те що нам приходить на сервер
	
        console.log('result:', arrdata.data)	
      }
      // якщо щось пішло не так то ловимо помилку
       else if (error) {
        console.error(error); 
      }
}

formEl.addEventListener('submit', (ev) => {
    //стрічка щоб не перезавантажувалась сторінка коли ми відправляєм файли
    ev.preventDefault()
    const formData = new FormData(ev.target);
    name = formData.get('name')
    surname = formData.get('surname')
    birthday = formData.get('birthday')
    years = formData.get('years')
    console.log(name, surname, birthday, years);
    infoUser()
    
});


