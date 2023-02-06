$(document).ready(function(){

let modelSpecs = '';
let modelPrice = 0;

let modelSpecsHolder = $('#modelSpecs');
let modelPriceHolder = $('#modelPrice');

$('#colorsSelector .colorItem').on('click', function(){
  let imgPath;
  imgPath = $(this).attr('data-img-path');
  console.log(imgPath);
  $('#imgHolder img').attr('src', imgPath);
});

$('#autoForm input').on('change', function() {
  calculatePrice();
  compileSpecs();
});

calculatePrice();
compileSpecs(); 

function calculatePrice(){
  let modelPriceEngine = $('input[name=engine]:checked', '#autoForm').val();
  let modePriceRakesystem = $('input[name=rakesystem]:checked', '#autoForm').val();
  let modelPricePackage = $('input[name=package]:checked', '#autoForm').val();

  modelPriceEngine = parseInt(modelPriceEngine);
  modePriceRakesystem = parseInt(modePriceRakesystem);
  modelPricePackage = parseInt(modelPricePackage);

  modelPrice = modelPriceEngine + modePriceRakesystem + modelPricePackage;

  modelPriceHolder.text( modelPrice + ' рублей' );

};

function compileSpecs(){
  modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text();
  modelSpecs = modelSpecs + ', ' + $('input[name=rakesystem]:checked + label', '#autoForm').text();
  modelSpecs = modelSpecs + ', ' + $('input[name=package]:checked + label', '#autoForm').text() + '.';

  modelSpecsHolder.text( modelSpecs );

};

function addSpace(nStr) { // не работает
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  let rgx = /(\d+)(\d{3})/;
  while(rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + '' + '$2');
  };
  return x1 + x2;
};

// Получить курс валют
let currencyUrl = 'https://www.nbrb.by/api/exrates/currencies[/{cur_id}]';
let rurUsdRate = 0;

$.ajax ({
  url: currencyUrl,
  cache: false,
  success: function(html){
    console.log(html);
  }
});
 
}); 