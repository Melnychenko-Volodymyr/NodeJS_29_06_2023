let input = document.querySelector('.input');
let textarea = document.querySelector('.textarea');
let button = document.querySelector('.button');

let authors = [];
let genres = [];
let article = {};

// відправка статті на сервер
const sendArticle = async () =>  {
	try {
	  const result = await axios.post('/send_article', article);
	} catch (error) {
	  console.error(error); // Обробка помилок
	}
  };

// обробка натискання кнопки для відправки статті
  button.addEventListener('click', (ev) => {
    article = {};
    article.title = input.value;
	article.content = textarea.value; 
	if (input.value && textarea.value) {
		input.value = '';
		textarea.value = '';
		sendArticle();		
	}
  }
  );

  
