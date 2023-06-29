let input = document.querySelector('.input');
let textarea = document.querySelector('.textarea');
let select = document.querySelector('.select');
let select2 = document.querySelector('.select2');
let button = document.querySelector('.button');

let contHTML = "";
let contHTML2 = "";
let articles = [];
let users = [];
let comment = {};

// запит масиву статей та формування списку select
const getArticles = async () => {
	const result = await axios.get('/article');
    articles = result.data.slice();
    for (let i=0; i<articles.length; i++) {
        contHTML += `<option value='${articles[i]._id}'> ${articles[i].title}</option>`
    }  
    select.innerHTML = contHTML;
  };

  getArticles();

// запит масиву користувачів та формування списку select
const getUsers = async () => {
	const result = await axios.get('/user');
    users = result.data.slice();
    for (let i=0; i<users.length; i++) {
        contHTML2 += `<option value='${users[i]._id}'>${users[i].name}</option>`
    }  
    select2.innerHTML = contHTML2;
  };

  getUsers();

// відправка коментаря на сервер
const sendComment = async () =>  {
	try {
	  const result = await axios.post('/send_comment', comment);
	} catch (error) {
	  console.error(error); // Обробка помилок
	}
  };

// обробка натискання кнопки для відправки статті
  button.addEventListener('click', (ev) => {
    comment = {};
    comment.id_article = select.value;
    comment.id_user = select2.value;
    comment.content = textarea.value;
	if (textarea.value) {
		textarea.value = '';
		sendComment();		
	}
  }
  );

  
