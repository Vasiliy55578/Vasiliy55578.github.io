const size_field_x = 20;
var size_field_y = 20;
var start_game = false;
var speed_snacke = 200; // Интервал между перемещениями змейки
var snacke = [];
var time_food;
var snacke_timer;
var direction = "y+"; // перемещение вверх
var score = 0; // результат

function init(){
     // Создаём таблицу
    var table = document.createElement('table');
    table.setAttribute("class", "game_table");
    table.style.border = "10px solid green";
        // Генерация ячеек игровой таблицы
    for( var i = 0; i < size_field_x; i++ ){
         // Создание строки
        var tr = document.createElement('tr');
        tr.className = "row table_row-"+i;
    
        for( var k = 0; k < size_field_y; k++ ){
            // Создание ячейки
            var td = document.createElement('td');
            td.className = "cell table_cell-"+i+"-"+k;
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
    document.getElementById("playing_field").appendChild(table);
    document.getElementById('start').addEventListener('click', start);

    // Отслеживание клавиш клавиатуры
    addEventListener('keydown', changeDirection);
}

function start () {
    start_game = true;
    respawn();
    snacke_timer = setInterval(move, speed_snacke);
    setTimeout(CreateFood, 4000);
}
    function respawn(){

    var x = Math.floor(size_field_x/2);
    var y = Math.floor(size_field_y/2);
    var snacke_head = document.getElementsByClassName('table_cell-'+y+"-"+x)[0];
    snacke_head.style.background = "center / cover url('тело.png'), center / cover url('трава.jpg')";
    snacke_head.setAttribute("class", snacke_head.getAttribute("class") + " snake");
    
    var snacke_tail = document.getElementsByClassName('table_cell-'+(y-1)+"-"+x)[0];
    snacke_tail.style.background = "center / cover url('голова_top.png'), center / cover url('трава.jpg')";
    snacke_tail.setAttribute("class", snacke_tail.getAttribute("class") + " snake");

    snacke.push(snacke_head);
    snacke.push(snacke_tail);
    }

    function move(){
        var snacke_head_classes = snacke[snacke.length-1].getAttribute("class").split(" ");
        var new_unit;
        var coords = snacke_head_classes[1].split("-");
        var y = parseInt(coords[1]);
        var x = parseInt(coords[2]);
        var body; 

        function body_hor(){
            body = document.getElementsByClassName('table_cell-'+(y)+"-"+(x))[0]; // body
            body.style.background = "center / cover url('тело_гор.png'), center / cover url('трава.jpg')";
        }
        function body_ver(){
        document.getElementsByClassName('table_cell-'+(y)+"-"+(x))[0].style.background = "center / cover url('тело.png'), center / cover url('трава.jpg')";
        }

        function body_head(step_y, step_x, position){
            if(step_y == ''){
                step_y = 0;
            } else {
                step_y = parseInt(step_y);
            }
            if(step_x == ''){
                step_x = 0;
            } else {
                step_x = parseInt(step_x);
            }
            var url = 'голова_'+ position +'.png';
            new_unit = document.getElementsByClassName('table_cell-'+(y + step_y)+"-"+(x + step_x))[0]; // head
            if(new_unit != undefined){
            new_unit.style.background = "center / cover url("+url+"), center / cover url('трава.jpg')";
            return new_unit;
            }
            return new_unit;
        }

////////////////////////////////////// right
        if( direction == "x+"){
            var bottom_right = [];
            var top_right = [];
            var left = [];

            body_hor(); // img тело горизонтально
            new_unit = body_head('','1', 'right'); // направление головы

        if( document.getElementsByClassName('table_cell-'+(y+1)+"-"+(x))[0] != undefined ){ // пока не приблизился к границе
            bottom_right = document.getElementsByClassName('table_cell-'+(y+1)+"-"+(x))[0].getAttribute("class").split(" "); // если съел яблоко и идет снизу направо
        }
            if( document.getElementsByClassName('table_cell-'+(y-1)+"-"+(x))[0] != undefined ){
            top_right = document.getElementsByClassName('table_cell-'+(y-1)+"-"+(x))[0].getAttribute("class").split(" "); // если съел яблоко и идет сверху направо
        }
        if( document.getElementsByClassName('table_cell-'+(y)+"-"+(x-1))[0] != undefined ){
        left = document.getElementsByClassName('table_cell-'+(y)+"-"+(x-1))[0].getAttribute("class").split(" "); // если съел яблоко и идет слева наверх
        }

        if((bottom_right[2] == 'snake' || top_right[2] == 'snake') && left[2] == 'snake'){
            body_hor();
        }
        else if(bottom_right[2] == 'snake'){
               body = document.getElementsByClassName('table_cell-'+(y)+"-"+(x))[0];       //тело
               body.style.background = "center / cover url('поворот_право.png'), center / cover url('трава.jpg')";
            } 
        else if(top_right[2] == 'snake'){
                body = document.getElementsByClassName('table_cell-'+(y)+"-"+(x))[0];       //тело
                body.style.background = "center / cover url('верх_право.png'), center / cover url('трава.jpg')";
             } 
        
        }
        /////////////////////////////// left
        else if( direction == "x-"){
            var bottom_left =[];
            var top_left = [];

            body_hor();
            new_unit = body_head('','-1',"left");

            if( document.getElementsByClassName('table_cell-'+(y+1)+"-"+(x))[0] != undefined ){ // пока не приблизился к границе
            bottom_left = document.getElementsByClassName('table_cell-'+(y+1)+"-"+(x))[0].getAttribute("class").split(" "); // если съел яблоко и идет снизу налево
            } 
        //    else{
        //        body_hor();
        //    }

            if( document.getElementsByClassName('table_cell-'+(y-1)+"-"+(x))[0] != undefined ){ // пока не приблизился к границе
            top_left = document.getElementsByClassName('table_cell-'+(y-1)+"-"+(x))[0].getAttribute("class").split(" "); // если съел яблоко и идет сверху налево
            } 
       //     else {
        //        body_hor();
        //    }
            var right = [];
            if( document.getElementsByClassName('table_cell-'+(y)+"-"+(x+1))[0] != undefined ){
            right = document.getElementsByClassName('table_cell-'+(y)+"-"+(x+1))[0].getAttribute("class").split(" "); // если съел яблоко и идет слева наверх
            }

            if((bottom_left[2] == 'snake' || top_left[2] == 'snake') && right[2] == 'snake'){
                body_hor();
            }
            else if( bottom_left[2] == 'snake'){  // если съел яблоко и идет снизу налево
               body = document.getElementsByClassName('table_cell-'+(y)+"-"+(x))[0];       //тело
               body.style.background = "center / cover url('поворот_лево.png'), center / cover url('трава.jpg')";
            } 
            else if(top_left[2] == 'snake'){ // если съел яблоко и идет сверху налево
               body = document.getElementsByClassName('table_cell-'+(y)+"-"+(x))[0];       //тело
               body.style.background = "center / cover url('лево_верх.png'), center / cover url('трава.jpg')";
             } 
        }
        ////////////////////////////////
        else if( direction == "y-"){
            var right_bottom = [];
            var left_bottom = [];

            body_ver();
            new_unit = body_head('1','', 'dawn');

            if( document.getElementsByClassName('table_cell-'+(y)+"-"+(x+1))[0] != undefined ){ // пока не приблизился к границе
            right_bottom = document.getElementsByClassName('table_cell-'+(y)+"-"+(x+1))[0].getAttribute("class").split(" "); // если съел яблоко и идет справа в низ
            } 
        //    else {
        //        body_ver();
        //    }

            if( document.getElementsByClassName('table_cell-'+(y)+"-"+(x-1))[0] != undefined ){ // пока не приблизился к границе
            left_bottom = document.getElementsByClassName('table_cell-'+(y)+"-"+(x-1))[0].getAttribute("class").split(" "); // если съел яблоко и идет слева в низ
            } 
         //   else {
          //      body_ver();
          //  }

            var top = [];
            if( document.getElementsByClassName('table_cell-'+(y-1)+"-"+(x))[0] != undefined ){
            top = document.getElementsByClassName('table_cell-'+(y-1)+"-"+(x))[0].getAttribute("class").split(" ");
            }
      
            if((left_bottom[2] == 'snake' || right_bottom[2] == 'snake' ) && top[2] == 'snake'){
                body_ver();
            }
            else if(right_bottom[2] == 'snake'){ // если съел яблоко и идет справа в низ
               body = document.getElementsByClassName('table_cell-'+(y)+"-"+(x))[0];       //тело
               body.style.background = "center / cover url('поворот_право.png'), center / cover url('трава.jpg')";
            } 
            else if(left_bottom[2] == 'snake'){  // если съел яблоко и идет слева в низ
                body = document.getElementsByClassName('table_cell-'+(y)+"-"+(x))[0];       //тело
                body.style.background = "center / cover url('поворот_лево.png'), center / cover url('трава.jpg')";
            }
        }
        else if( direction == "y+"){
            var right_top = [];
            var left_top = [];

            body_ver();
            new_unit = body_head('-1','', 'top');

            if( document.getElementsByClassName('table_cell-'+(y)+"-"+(x+1))[0] != undefined ){ // пока не приблизился к границе
            right_top = document.getElementsByClassName('table_cell-'+(y)+"-"+(x+1))[0].getAttribute("class").split(" "); // если съел яблоко и идет справа наверх
            } 
         //   else {
         //       body_ver();
         //   }

            if( document.getElementsByClassName('table_cell-'+(y)+"-"+(x-1))[0] != undefined ){ // пока не приблизился к границе
            left_top = document.getElementsByClassName('table_cell-'+(y)+"-"+(x-1))[0].getAttribute("class").split(" "); // если съел яблоко и идет слева наверх
        } 
      //  else {
      //      body_ver();
      //  }

        var bottom = [];
        if( document.getElementsByClassName('table_cell-'+(y+1)+"-"+(x))[0] != undefined ){
        bottom = document.getElementsByClassName('table_cell-'+(y+1)+"-"+(x))[0].getAttribute("class").split(" "); // если съел яблоко и идет слева наверх
        }

        if((left_top[2] == 'snake' || right_top[2] == 'snake') && bottom[2] == 'snake'){
            body_ver();
        }
               else if(right_top[2] == 'snake'){ // если съел яблоко и идет справа наверх
                  body = document.getElementsByClassName('table_cell-'+(y)+"-"+(x))[0];       //тело
                  body.style.background = "center / cover url('верх_право.png'), center / cover url('трава.jpg')";
               }
               else if(left_top[2] == 'snake'){ // позиция лево-право-верх
                body = document.getElementsByClassName('table_cell-'+(y)+"-"+(x))[0];       //тело
                body.style.background = "center / cover url('лево_верх.png'), center / cover url('трава.jpg')";
               }
        }

    if (!isSnackeUnit(new_unit) && new_unit !== undefined ){
        new_unit.setAttribute("class", new_unit.getAttribute("class") + " snake");
        snacke.push(new_unit);

        if(!haveFood(new_unit)){
            var remove = snacke.splice(0, 1)[0];
            var classes = remove.getAttribute("class").split(" ");
            remove.setAttribute("class", classes[0] +" "+ classes[1]);
            remove.style.background = "";
        }
    }
    else {
        finishGame();
    }
}

    function isSnackeUnit(unit){
        var check = false;
        if(snacke.includes(unit)){
            check = true;
        }
        return check;
    }

    function haveFood(unit){
        var check = false;
        var unit_classes = unit.getAttribute("class").split(" ");
        if (unit_classes.includes("food")){
            var check = true;   
            CreateFood();
            score++;
        }
        return check;
    }

    function CreateFood(){
        var foodCreated = false;
        while(!foodCreated){
            var food_x = Math.floor(Math.random() * size_field_x);
            var food_y = Math.floor(Math.random() * size_field_y);

            var food = document.getElementsByClassName('table_cell-'+food_y+"-"+food_x)[0];
            var food_classes = food.getAttribute("class").split(" ");

            if(!food_classes.includes("snacke")){
                var classes = "";
                for ( var i=0; i <= food_classes.length; i++){
                    classes += food_classes[i] + " ";
                }
                food.setAttribute("class", classes + "food");
                var foodCreated = true;
            }
        }
    }

    function changeDirection(e){
        switch (e.keyCode){
            case 37: //влево
            if(direction != "x+"){
                direction = "x-";
            }
            break;
            case 39: //вправо
            if(direction != "x-"){
                direction = "x+";
            }
            break;
            case 38: //верх
            if(direction != "y-"){
                direction = "y+";
            }
            break;
            case 40: //вниз
            if(direction != "y+"){
                direction = "y-";
            }
            break;
        }
    }

    function finishGame(){
        start_game = false;
        clearInterval(snacke_timer);
        alert ("Вы проиграли. Результат: " + score.toString());
    }

    function refresh(){
        location.reload();
    }

    window.onload = init;