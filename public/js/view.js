let author = document.querySelector('.author');
let title = document.querySelector('.title');
let genre = document.querySelector('.genre');
let cont = document.querySelector('.cont');
let cont1 = document.querySelector('.cont1');
let button_prev = document.querySelector('.button_prev');
let button_next = document.querySelector('.button_next');

let article = {};
let articles = []; 
let html = '';
let n = 0;
let id = '';

// відправка id статті на сервер і отримання масиву коментарів
const sendId = async () =>  {
	  const result = await axios.get(`/send_id/?id_article=${id}`);
    let comments = result.data;
    html = ''
    for (let i=0; i<comments.length; i++) {
      html += `<p> Користувач: ${comments[i].id_user.name}  *  Дата створення: ${moment(comments[i].createdAt).format('DD-MM-YYYY HH:mm:ss')}</p>
                <p>${comments[i].content}</p><br>`
    };
    cont1.innerHTML =  html;


  };


// відображення  статті
const render = () => {

  title.innerHTML = 'Назва: ' + articles[n].title;
	cont.innerHTML = articles[n].content;

  id = articles[n]._id;
   sendId();
};


// запит існуючих статей на сервері і відображення першої статті
const getArticles = async () => {
	const result = await axios.get('/article');
    articles = result.data.slice();
	render();
  };

  getArticles();


// обробка натискання кнопки для перегляду попередньої статті
  button_prev.addEventListener('click', (ev) => {
    n = n - 1;
	if (n < 0) n = articles.length - 1;
    render();
  }
  );

 // обробка натискання кнопки для перегляду наступної статті
 button_next.addEventListener('click', (ev) => {
    n = n + 1;
	if (n > articles.length-1) n = 0;
    render();
  }
  ); 

  