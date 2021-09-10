$(document).ready(function(){


    $('.game_hands button').on("click",function(){

       let hand_name_user =  $(this).data("name");
       let hand_btn = $(this).closest('div').html();
       var hand_name_house = rollPositionChose();

       cleanState();
       $('.game_hands').hide();

       $('.game_hands_choosed .you_picked').html('<div class="label"> <label>YOU PICKED</label> </div><div class="'+hand_name_user+'">'+hand_btn+'</div>');
       $('.game_hands_choosed').fadeIn();

       setTimeout(function () {
          let img = hand_name_house.replace('hand_','');
          $('.game_hands_choosed .house_picked').html('<div class="label"><label>THE HOUSE PICKED</label></div><div class="'+hand_name_house+'"><button><img src="images/icon-'+img+'.svg" alt=""></button></div>');

       }, 2000);


       let winner = getResultWinner(hand_name_user, hand_name_house);


       setTimeout(function () {

          $(".game_hands_choosed .result_game").css("display","block");
          let label;
          switch (winner) {
            case "none":
              label = "DRAW";
            break;
            case 'you_picked':
              label = "YOU WIN";
              $(".container_scoreboard .value").html( parseInt( $(".container_scoreboard .value").html() ) + 1);
            break;
            case 'house_picked':
              label = "YOU LOSE";
              $(".container_scoreboard .value").html( parseInt( $(".container_scoreboard .value").html() ) - 1);
            break;
            default:
          }
          $(".game_hands_choosed .result_game").html('<div class="you_win_lose"><label>'+label+'</label> </div> <div class="btn"> <button onclick="playAgain()">PLAY AGAIN</button> </div');


       }, 3000);




    });








});



function playAgain(){
  $(".game_hands_choosed").hide();
  $('.game_hands').fadeIn();
}

function getResultWinner(user, house){

    user = user.replace('hand_',''); house = house.replace('hand_','');
    let winner;

    // paper > rock , rock > scissors, scissors > paper
    if( user == 'paper' && house == 'rock' || user == 'rock' && house == 'scissors' || user == 'scissors' && house == 'paper' ){
      winner = 'you_picked';
    }
    else if ( house == 'paper' && user == 'rock' || house == 'rock' && user == 'scissors' || house == 'scissors' && user == 'paper' ) {
      winner = 'house_picked';
    }else {
      winner = 'none';
    }
    console.log(user);
    console.log(house);
    console.log(winner);
    return winner;
}



function cleanState(){

  $(".game_hands_choosed .result_game").html('');
  $(".game_hands_choosed .house_picked").html('<div class="house_picked"><div class="label"><label>THE HOUSE PICKED</label></div><div class="hand_none"><button><img src="" alt=""></button></div></div>');

}


function rollPositionChose(){

    //random position
    let position = Math.floor(Math.random(1) * 3);
    let hand_name;

    switch (position) {
      case 0:
        hand_name = 'hand_paper';
      break;
      case 1:
        hand_name = 'hand_scissors';
      break;
      case 2:
        hand_name = 'hand_rock';
      break;
      default:
    }

    return hand_name;

}

function closeRules(){
    $('.container_blank').fadeOut();
}

function openRules(){
    $('.container_blank').fadeIn();
}
