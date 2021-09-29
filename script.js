
// ----------- МЕНЮ ----------- //

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href').substring(1)
    
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}


// ----------- ОБРАБОТКА ЗАГРУЗКИ ФАЙЛА ----------- //

(function(){
  
  var input = document.querySelector('.file__input');
  var filePreviewWrap = document.querySelector('.file__preview-wrap'); 
  input.addEventListener('change', updateImageDisplay);
  
  var fileTypes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'application/pdf'
    ]
    
  function validFileType(file) {
    for(var i = 0; i < fileTypes.length; i++) {
      if(file.type === fileTypes[i]) {
        return true;
      }
    }
    return false;
  }
    
  function returnFileSize(number) { // возвращает размер файла
    if(number < 1024) {
      return number + ' bytes';
    } else if(number > 1024 && number < 1048576) {
      return (number/1024).toFixed(1) + ' KB';
    } else if(number > 1048576) {
      return (number/1048576).toFixed(1) + ' MB';
    }
  }

  function toShort(value){ // укорачивает имя файла
    if(value.length > 15) {
      value = value.substring(0,14)+"...";
      }
      return value
  }

  function updateImageDisplay() {
    while(filePreviewWrap.firstChild) {
      filePreviewWrap.removeChild(filePreviewWrap.firstChild);
    }
    
    var curFiles = input.files;
    if(curFiles.length === 0) {
      var para = document.createElement('p');
      para.textContent = 'Файлы к загрузке не выбраны';
      filePreviewWrap.appendChild(para);
    } else {
      
      for(var i = 0; i < curFiles.length; i++) {
       
        if(validFileType(curFiles[i])) { // если текущий файл прошел валидацию то :

          var filePreview = document.createElement('div'); 
          filePreview.classList.add('file__preview');
          filePreviewWrap.appendChild(filePreview); 

          var fileImageWrap = document.createElement('div'); 
          fileImageWrap.classList.add('file__image-wrap'); 
          filePreview.appendChild(fileImageWrap);

          var image = document.createElement('img');
          image.src = window.URL.createObjectURL(curFiles[i]); 
          fileImageWrap.appendChild(image); 
          
          var fileInfo = document.createElement('div');
          fileInfo.classList.add('file__info');
          var fileName = document.createElement('div')
          fileName.classList.add('file__name');
          
          filePreview.appendChild(fileInfo);

          fileInfo.appendChild(fileName);

          var fileAddInfo = document.createElement('div');
          fileAddInfo.classList.add('file__add-info');

          fileInfo.appendChild(fileAddInfo);

          var fileFormat = document.createElement('span');
          fileFormat .classList.add('file__format');

          fileAddInfo.appendChild(fileFormat);

          var fileWeigth = document.createElement('span');
          fileWeigth.classList.add('file__weigth');

          fileAddInfo.appendChild(fileWeigth);

          var fileDelete = document.createElement('div');
          fileDelete.classList.add('file__delete');
          filePreview.appendChild(fileDelete);

          var imageDel = document.createElement('img'); // создаем элемент картинку
          fileDelete.appendChild(imageDel);
          imageDel.src = 'images/file__delete.svg'

          imageDel.addEventListener('click', function(){
            this.closest('.file__preview').remove();
            input.value="null"
          })

          var name = curFiles[i].name;
          nameWithoutExt = name.replace(/(.*)\.[^.]+$/, "$1");
          var shornName = toShort(nameWithoutExt);
          
          fileName.textContent = shornName;
          
          fileFormat.textContent = (name.substring(name.lastIndexOf('.')+1, name.length) || name) + ' ' 
          
          fileWeigth.textContent = returnFileSize(curFiles[i].size);
            
        } else {

            var fileError = document.createElement('div');
            fileError.classList.add('file__delete');
            filePreviewWrap.appendChild(fileError);
            fileError.textContent = 'Файл ' + curFiles[i].name + ': имеет неверное разрешение. Попробуйте еще раз.';
          }
      }
    }
  }
})()




// ----------- ВАЛИДАЦИЯ ФОРМЫ ----------- //

let myForm = document.getElementById('form')

const name = document.getElementById('name');
const nameError = document.querySelector('#name + span.error');

const gender = document.getElementById('gender');
const genderError = document.querySelector('#gender + span.error');

const country = document.getElementById('country');
const countryError = document.querySelector('#country + span.error');

const city = document.getElementById('city');
const cityError = document.querySelector('#city + span.error');

const date = document.getElementById('date');
const dateError = document.querySelector('#date + span.error');

const file = document.getElementById('file');
const fileError = document.querySelector('#file + span.error');
const submitButton = document.getElementById('submitButton')

name.addEventListener('input', function(event){
  if(name.validity.valid){
    nameError.innerHTML = '';
    nameError.className.add = 'error';
    name.style.border='1px solid #8E43ED';
  } else{
    showError(name, nameError);
  }
});
gender.addEventListener('input', function(event){
  if(gender.validity.valid){
    genderError.innerHTML = '';
    genderError.className.add = 'error';
    gender.style.border='1px solid #8E43ED';
  } else{
    showError(gender, genderError);
  }
});
country.addEventListener('input', function(event){
  if(country.validity.valid){
    countryError.innerHTML = '';
    countryError.className.add = 'error';
    country.style.border='1px solid #8E43ED';
  } else{
    showError(country, countryError);
  }
});
city.addEventListener('input', function(event){
  if(city.validity.valid){
    cityError.innerHTML = '';
    cityError.className.add = 'error';
    city.style.border='1px solid #8E43ED';
  } else{
    showError(city, cityError);
  }
});
date.addEventListener('input', function(event){
  if(date.validity.valid){
    dateError.innerHTML = '';
    dateError.className.add = 'error';
    date.style.border='1px solid #8E43ED';
  } else{
    showError(date, dateError);
  }
});


myForm.addEventListener('submit', function(event){
  if(!name.validity.valid){
    showError();
    event.preventDefault();
  }
});

function showError(name, er){
  if(name.validity.valueMissing){
    er.textContent = 'Text error'
    name.style.border='1px solid #ED4376'
  } else if(name.validity.tooShort){
    er.textContent = 'Text error'
    name.style.border='1px solid #ED4376'
  }
  name.className.add = 'error'
  name.style.border='1px solid #ED4376'
}


// ----------- МАСКА ДЛЯ ДАТЫ ----------- //

var dateInput = document.querySelectorAll('.text-field__date')[0];
  
var dateInputMask = function dateInputMask(elm) {
  elm.addEventListener('keypress', function(e) {
    if(e.keyCode < 47 || e.keyCode > 57) {
      e.preventDefault();
    }
    
    var len = elm.value.length;
    
    if(len !== 1 || len !== 3) {
      if(e.keyCode == 47) {
        e.preventDefault();
      }
    }
    
    if(len === 2) {
      elm.value += '.';
    }

    if(len === 5) {
      elm.value += '.';
    }
  });
};
  
dateInputMask(dateInput);




// ----------- СЛАЙДЕР ----------- //

const slideItem = document.querySelectorAll('.slider__item')
dot = document.querySelectorAll('.slider__dot')

let counter = 1;
slideFunc(counter)

let timer = setInterval(autoslide, 8000);
function autoslide(){
  counter+=1;
  slideFunc(counter);
}

function plusSlides(n){
  counter+=n;
  slideFunc(counter);
  resetTimer();
}

function currentSlide(n){
  counter = n;        
  slideFunc(counter);
  resetTimer();
}

function resetTimer(){
  clearInterval(timer);
  timer = setInterval(autoslide, 8000);
}

function slideFunc(n){
  let i;
  for(i = 0; i < slideItem.length; i++){
      slideItem[i].style.display='none'
  }
  for(i = 0; i < dot.length; i++){
      dot[i].classList.remove('slider__active')
  }
  if(n > slideItem.length){
      counter = 1;
  }
  if(n < 1){
      counter = slideItem.length;
  }
  slideItem[counter - 1].style.display = 'block';
  dot[counter - 1].classList.add('slider__active');
}
