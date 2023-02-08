$(document).ready(function() {

  let modelSpecs = '';
  let modelPrice = 0;
  let modelSpecsHolder = $('#modelSpecs');
  let modelPriceHolder = $('#modelPrice');
  let modelPriceUSDHolder = $('#modelPriceUSD');

  $('#autoForm input').on('change', function() {
    calculatePrice();
    compileSpecs();
    calculateUSD();
  });

  calculatePrice();
  compileSpecs(); 

  $('#colorsSelector .colorItem').on('click', function() {
    let imgPath;
    imgPath = $(this).attr('data-img-path');
    $('#imgHolder img').attr('src', imgPath);
  });

  function calculatePrice() {
    let modelPriceEngine = $('input[name=engine]:checked', '#autoForm').val();
    let modelPriceRakesystem = $('input[name=rakesystem]:checked', '#autoForm').val();
    let modelPricePackage = $('input[name=package]:checked', '#autoForm').val();

    modelPriceEngine = parseInt(modelPriceEngine);
    modelPriceRakesystem = parseInt(modelPriceRakesystem);
    modelPricePackage = parseInt(modelPricePackage);

    modelPrice = modelPriceEngine + modelPriceRakesystem + modelPricePackage;

    modelPriceHolder.text( modelPrice + ' рублей');
  };

  function compileSpecs() {
    modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text();
    modelSpecs = modelSpecs + ', ' + $('input[name=rakesystem]:checked + label', '#autoForm').text();
    modelSpecs = modelSpecs + ', ' + $('input[name=package]:checked + label', '#autoForm').text();

    modelSpecsHolder.text( modelSpecs );
  };

  function addSpace(nStr) { 
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx =/(\d+)(\d{3})/;
    while(rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + '' + '$2');
    };
    return x1 + x2;
  };

//Получить курс валют

  let currencyUrl= 'https://www.nbrb.by/api/exrates/rates/431';
  let rurUsdRate = 0;

  $.ajax ({
    url: currencyUrl,
    cache: false,
    success: function(html) {
      rurUsdRate = html.Cur_OfficialRate;
      calculateUSD();
    }
  });

  function calculateUSD() {
    let modelPriceUSD = modelPrice / rurUsdRate;
    modelPriceUSDHolder.text( '$ ' + modelPriceUSD.toFixed(0));
  }

}); 