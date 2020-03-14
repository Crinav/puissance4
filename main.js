(function($) {
  $.fn.puissance4 = function(options){
    let defaut = $.extend({
      nbx : 7,
      nby : 6,
      color1 : 'red',
      color2 : 'yellow',
      name1 : 'player1',
      name2 : 'player2',
      name3 : 'computer'
  }, options);
 
  class Player {
    constructor(name, color) {
      this.name = name;
      this.color = color;
    }
  }
  class Grid {
    constructor(nbx, nby) {
      this.nbx = nbx;
      this.nby = nby;
    }
    

    affichage() {
      
      $('body').append('<h1 class="titre button">Puissance 4</h1>');
      $('.titre').after('<h2 class="tour button"></h2>');
      $('body').append('<table id="tableau"></table');
      $('body').append('<div class="annuler"><button class="button" id="annuler" type="button">Annuler son dernier coup</button></div>' );
      $('.annuler').css({
        'text-align':'center'
      })
      let plateau = [];
      for (let i = 0; i < this.nby; i++) {
        $('#tableau').append('<tr id="' + i + '">');
        plateau[i] = [];
        for (let j = 0; j < this.nbx; j++) {
          $('tr:last').append('<td class="' + j + '">');
          plateau[i][j] = 0;
        }
      }
      $('#tableau').css({
        'margin-bottom': 0,
        'padding': '1em',
        'background-color': 'darkblue',
        'margin-left': 'auto',
        'margin-right': 'auto'
      })

      $('td').css({
        'margin': '1em',
        'width': '80px',
        'height': '80px',
        'border-radius': '50%',
        'background-color': 'white',
        'padding': '1em'
      })
      $('#tableau').after('<div class="control"></div>');
      $('.control').after('<div class="score"></div>');
      $('.score')
      .css({
        'text-align':'center'
      })
      .html('<h3>Score</h3>')
      .append('<div class="player1"></div>')
      .append('<div class="player2"></div>');      
      $('.player1').append('<span>'+player1.name+' : </span>');
      $('.player1 span').after('<span id="'+player1.name+'">0</span>');
      $('.player2').append('<span>'+player2.name+' : </span>');
      $('.player2 span').after('<span id="'+player2.name+'">0</span><br><br>');

      $('body').append('<div id="modal">\
      <h4 class="modal-title">Voulez-vous ?</h4><br>\
      <div class="button">\
      <button type="button" class="button" id="continuer" >Continuer</button>\
      <button type="button" class="button" id="recommencer" >Recommencer</button>\
      </div></div>');
      $("#modal ").hide();
      $('#modal').css({
        'position': 'fixed',
        'height': '150px',
        'overflow': 'hidden',
        'background-color': 'rgba(22, 200, 244)',
        'border-radius': '10px',
        'top': '250px',
        'left': '725px',
        'width': '300px'
      })
      $('.modal-title').css({
        'text-align': 'center'
      })
      $('.button').css({
        'text-align': 'center'
      })
      let player = player1;
      $('.tour').html('Au tour de <span style="color:'+player.color+'">'+player.name+'</span> de jouer...');
     
      $(document).on('click', 'td', function (){
        let col = $(this).get(0).className;
        if (player == player1) {
          player = player2;
          $('.tour').html('Au tour de <span style="color:'+player.color+'">'+player.name+'</span> de jouer...');
          let longueur = plateau.length - 1;
          for (let i = longueur; i >= 0; i--) {
            if (plateau[i][col] == 0) {
              $('#annuler').attr({
                'ligne':i,
                'col':col
              })
              plateau[i][col] = player1.color;
              $('tr:eq(' + i + ')  td:eq(' + col + ')').css({'background-color': player1.color})
              verif(plateau, i, col, player1);
              break;
            }
          }
        }
        
        else {
          player = player1;
          $('.tour').html('Au tour de <span style="color:'+player.color+'">'+player.name+'</span> de jouer...');
          let longueur = plateau.length - 1;
          for (let i = longueur; i >= 0; i--) {
            if (plateau[i][col] == 0) {
              $('#annuler').attr({
                'ligne':i,
                'col':col
              })
              plateau[i][col] = player2.color;
              $('tr:eq(' + i + ')  td:eq(' + col + ')').css({
                'background-color': player2.color
              })
              verif(plateau, i, col, player2);
              break;
            }
          }
        }
        ///verification de victoire 
        function verif(plateau, ligne, col, player) {
          let color_click = plateau[ligne][col];
          let jeton = 0;

          //horizontale
          for (let i = 0; i < plateau[ligne].length; i++) {
            (plateau[ligne][i] == color_click) ? jeton++ : jeton = 0;
            if (jeton == 4) {
              for (let j = 0; j < 4; j++) {
              $('tr:eq(' + ligne + ')  td:eq(' + (i-j) + ')').css({
                'background-color': 'black'
              })
            }
              alert(player.name+' is the winner !');
              let plus1 = $('#'+player.name+'').text();
                $('#'+player.name+'').text(parseInt(plus1)+1);
              $("#modal ").show();
              $('#continuer').click(function(){
                $("#modal ").hide();
                let p1=$('#player1').text();
                let p2=$('#player2').text();
                jeton = 0;
                reset(plateau,p1,p2);
              }) 
            }
          }
          //verticale
          for (let i = 0; i < plateau.length; i++) {
            (plateau[i][col] == color_click) ? jeton++ : jeton = 0;
            if (jeton == 4) {
              for (let j = 0; j < 4; j++) {
                $('tr:eq(' + (i-j) + ')  td:eq(' + (col) + ')').css({
                  'background-color': 'black'
                })
              }
              alert(player.name+' is the winner !');
              let plus1 = $('#'+player.name+'').text();
                $('#'+player.name+'').text(parseInt(plus1)+1);
              $("#modal ").show();
              $('#continuer').click(function(){
                $("#modal ").hide();
                let p1=$('#player1').text();
                let p2=$('#player2').text();
                jeton = 0;
                reset(plateau,p1,p2);
              }) 
          }
        }
          //diagonale gauche droite
          for (let i = 3; i < plateau.length; i++) {
            for (let j = 0; j < plateau[ligne].length-3; j++) {
              if(plateau[i][j] == color_click && plateau[i - 1][j + 1] == color_click && plateau[i - 2][j + 2] == color_click && plateau[i - 3][j + 3] == color_click){
                for (let k = 0; k < 4; k++) {
                  $('tr:eq(' + (i-k) + ')  td:eq(' + (j+k) + ')').css({
                    'background-color': 'black'
                  })
                }
                alert(player.name+' is the winner !');
                let plus1 = $('#'+player.name+'').text();
                $('#'+player.name+'').text(parseInt(plus1)+1);
                $("#modal ").show();
                $('#continuer').click(function(){
                  $("#modal ").hide();
                  let p1=$('#player1').text();
                  let p2=$('#player2').text();
                  jeton = 0;
                  reset(plateau,p1,p2);
                })
              } 
            }
          }  
          // diagonale droite gauche 
          for (let i = 3; i < plateau.length; i++) {
            for (let j = 3; j < plateau[ligne].length; j++) {
              if(plateau[i][j] == color_click && plateau[i - 1][j - 1] == color_click && plateau[i - 2][j - 2] == color_click && plateau[i - 3][j - 3] == color_click){
                for (let k = 0; k < 4; k++) {
                  $('tr:eq(' + (i-k) + ')  td:eq(' + (j-k) + ')').css({
                    'background-color': 'black'
                  })
                }
                alert(player.name+' is the winner !');
                let plus1 = $('#'+player.name+'').text();
                $('#'+player.name+'').text(parseInt(plus1)+1);
                $("#modal ").show();
                $('#continuer').click(function(){
                  $("#modal ").hide();
                  let p1=$('#player1').text();
                  let p2=$('#player2').text();
                  jeton = 0;
                  reset(plateau,p1,p2);
                })
              } 
            }
          }  
          
          
          
          //plateau plein, gestion du match nul
          let flag=null;
        $.each(plateau, function(index,value){
          $.each(value, function(nb, val){
            if(parseInt(val) == 0){
              flag=0;
            }
          })
        })
        if(flag == null){
          let p1=$('#player1').text();
          let p2=$('#player2').text();
          alert('partie nulle');
          reset(plateau, p1,p2);
        }
        
      }
      
      })  
      //annuler dernier coup
      $('#annuler').on('click', function(){
        let ligne = $('#annuler').attr('ligne');
        let col = $('#annuler').attr('col');
        plateau[ligne][col] = 0;
          $('tr:eq(' + ligne + ')  td:eq(' + col + ')').css({
            'background-color': 'white'
          })
          console.log(player1);
         (player==player1)?player=player2:player=player1;
         $('.tour').html('Au tour de <span style="color:'+player.color+'">'+player.name+'</span> de jouer...');

         console.log(player2);
        
      })
      

      // reset le plateau
      function reset(plateau, p1,p2) {
        $('#player1').text(p1);
        $('#player2').text(p2);
        for (let i = 0; i < plateau.length; i++) {
          for (let j = 0; j < plateau[i].length; j++) {
            plateau[i][j] = 0;
          }
          $('td').css({
            'background-color': 'white'
          })
        }
      }
    }

  }
  $('body').append('<div class="container"></div>');
  $('.container').prepend('<h1 class="titre">Puissance 4</h1>');
  $('.titre').css({'text-align':'center'})
  $('.container').css({
    'width' : '800px',
    'margin-left':'auto',
    'margin-right':'auto',
    'background-color':'#291fef',
    'padding':'2em'
  })  
  $('body').css({'background-image':'url("public/src/4.png")', 'color':'white'});
  $('.container').append('<form class="form0"></form>');
  $('.form0').append('<fieldset class="field0"></fieldset>');
  $('.field0').append('<legend>Veuillez indiquer la taille du plateau <em>(par defaut 7 colonnes sur 6 lignes)</em></legend>')
  $('.field0').append('<div class="col_ligne">\
                      <legend>Colonnes</legend>\
                      <input type="number" name="col"><br><br>\
                      <legend>Lignes</legend>\
                      <input type="number" name="ligne"><br>\
                      </div>');
  $('.col_ligne').css({'text-align':'center'})
  $('.container').append('<form class="form1"></form>');
  $('.container').append('<form class="form2"></form>');
  $('.form1').append('<fieldset class="field1"></fieldset>');
  $('.field1').append('<legend>Joueur1 entrez votre nom, sinon vous serez: player1, et choisissez une couleur</legend>')
  $('.field1').append('<input type="text" class="name1">');
  $('.field1').append('<label for="color">Choississez une couleur:</label>');
  $('.field1').append('<select id="color1">');
  $('#color1').append('<option value="red">Rouge</option>\
                      <option value="yellow">Jaune</option>\
                      <option value="green">Vert</option>\
                      <option value="pink">Rose</option>\
                      <option value="blue">Bleu</option>\
                      <option value="grey">Gris</option><br>');
  $('.form2').append('<fieldset class="field2"></fieldset>');
  $('.field2').append('<legend>Joueur2 entrez votre nom, sinon vous serez: player2, et choisissez une couleur</legend>');
  $('.field2').append('<input type="text" class="name2">');
  $('.field2').append('<label for="color">Choississez une couleur:</label>');
  $('.field2').append('<select id="color2">');
  $('#color2').append('<option value="red">Rouge</option>\
                      <option value="yellow">Jaune</option>\
                      <option value="green">Vert</option>\
                      <option value="pink">Rose</option>\
                      <option value="blue">Bleu</option>\
                      <option value="grey">Gris</option><br>');
  $('.container').append('<input type="submit" class="submit" value="Jouer">');
  $('.submit').css({
    'margin-left':'24em',
    'width':'85px',
    'height':'85px',
    'background':'#fafafa',
    'box-shadow':'2px 2px 8px #aaa',
    'font':'bold 15px Arial',
    'border-radius':'50%',
    'color':'#555',

})
  $('.form1, .form2').css({'margin':'2em'})
  $('label').css({
    'margin-left':'10em',
    'margin-right':'1em'
  })
  $(document).on('click', '.submit', function(e){
    e.preventDefault();
    let nom1= $('input[class="name1"]').val();
    let nom2= $('input[class="name2"]').val();
    let color1 = $('select[id="color1"]').val();
    let color2 = $('select[id="color2"]').val();
    let col = $('input[name="col"]').val();
    let ligne = $('input[name="ligne"]').val();
    if(color1 == color2){
      alert('Veuillez choisir deux couleurs différentes');
    }
    else if(col!=="" && col<4 || ligne !=="" && ligne<4){
      alert('veuillez choisir au minimum, 4 colonnes et 4 lignes');
    }
    else{
      if(nom1 == ""){
        nom1 = defaut.name1;
      }
      if(nom2 == ""){
        nom2 = defaut.name2;
      }
      if(col ==""){
        col = defaut.nbx;
      }
      if(ligne ==""){
        ligne = defaut.nby;
      }
      $('body').css({'background-image':'none'})
      $('.container').hide();
      player1 = new Player(nom1, color1);
      player2 = new Player(nom2, color2);
      grid = new Grid(col, ligne);
      grid.affichage();
    }
})
  
  $('#recommencer').click(function(){
        $("#modal ").hide();
        window.location = 'index.php';
    })

    
  }
  })(jQuery)
 
  

    