let cont2 = document.querySelector('.cont2');
let inp_name = document.querySelector('.inp_name');
let inp_phone = document.querySelector('.inp_phone');
let select = document.querySelector('.select');
let select2 = document.querySelector('.select2');
let btn_minus = document.querySelector('.btn_minus');
let btn_plus = document.querySelector('.btn_plus');
let input_file =document.querySelector('.input_file');
let btn_submit = document.querySelector('.btn_submit');
let quantity = document.querySelector('.quantity');

let n = 1;
let selectedFile = '';
let formData = '';
let fileName = '';
let order = {};
let name = '';
let phone = '';
let size = '';

// обробка натискання кнопки -
btn_minus.addEventListener('click', (ev) => {
     n = n - 1;
     if (n < 1) n = 1;
     quantity.innerHTML = String(n);     
  });
// обробка натискання кнопки +
btn_plus.addEventListener('click', (ev) => {
    n = n + 1;
    if (n > 20) n = 20;
    quantity.innerHTML = String(n);     
 });

// вибір файлу
  input_file.addEventListener('change', () => {
    let selectedFile = input_file.files[0];
    filename = input_file.value.slice(12);
    console.log(filename);
    let reader = new FileReader();
    reader.onload = (ev) => {
    // виведення зображення
    cont2.style.backgroundImage = `url(${ev.target.result})`;
    cont2.style.backgroundSize ='contain';
    cont2.style.backgroundRepeat ='no-repeat';
    // формування FormData з файлом для передачі на сервер
    formData = new FormData();
    formData.append('file', selectedFile);
    }
 
    reader.readAsDataURL(selectedFile);
});


//----- відправка файла і запис в БД

btn_submit.addEventListener('click', (ev) => {
   
   name = inp_name.value;
   phone = inp_phone.value; 
   size =  select.value;
   if (name && phone && filename) {
     // відправка файла на сервер 
     const sendFile = async () =>  {
       try {
         const result = await axios.post('/upload', formData);
       } catch (error) {
         console.error(error); // Обробка помилок
       }
       };
  
     sendFile();  

    // відправка запису про замовлення на сервер
    order = {};
    order.name = name;
    order.phone = phone;
    order.size = size;
    order.quantity = n;
    order.filename = filename;
    const sendOrder = async () =>  {
	     try {
	       const result = await axios.post('/send_order', order);
	     } catch (error) {
	       console.error(error); // Обробка помилок
	     }
      };

      sendOrder();

   }

  
});

