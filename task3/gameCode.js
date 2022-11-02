var event, answerCorrect=0,money=0;
var ok = false;

function startGame(event) {
    document.getElementById('hide').style.display = 'block';
    var i = 0; // какой будет выводится вопрос
    all_questions(event, i);
    function all_questions(event, i) {

        if(!questions[i]){
            alert("Конец игры. Правильных ответов: "+ answerCorrect + ". Заработано монет: "+ money);
        }
        var count_answer = 1;
            for (key in questions[i]) {
                if(key == 'question'){
                    document.getElementById('header').innerText = questions[i][key];
                }
                else if ( key != 'correct'){
                    document.getElementById('q_'+count_answer).innerText = questions[i][key];
                    count_answer++;
                }
                else if ( key == 'correct'){
                    let mass_a = document.querySelectorAll('#answers a');
                    for (let k = 0; k < mass_a.length; k++) {
                    mass_a[k].onclick = function(){
                    let id = this.id;
                    let x = id.split("_"); // массив q, 1
                    if(x[1] == questions[i].correct){
                        event = questions[i].correct
                        this.style.background = "#0dd113";
                        answerCorrect++; 
                        if(i<5){
                            money+=100;          
                        }
                        else if(i>=5 && i<10){
                            money+=1000;          
                        }
                        i++;
                        setTimeout(() => {  this.style.background = "";
                        all_questions(event, i);
                    }, 1200);
                    }
                    else {
                        this.style.background = "#ed3232";  
                        i++;
                        setTimeout(() => {  this.style.background = "";
                        all_questions(event, i);
                    }, 1200);
                    }
                    }
                    }
                }
            }
       } 
}