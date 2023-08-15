//再設定してはいけないものをローカルに出す。
let canvassize = {
    w: 400,
    h: 400
}//キャンバスのサイズ
let hart = 4; //体力
let level = 1; //最初のレベル
let count = 1; //最初のカウント
let miniflag = 0;//ミニゲーム開始されているかのフラグ
let mousecount = 0;//マウスのカウント
let minigametimer = 500//ミニゲームの制限時間
let gametimer = 250//メイン表示じかん
let speed = 1;//スピードアップ用
let a = Math.ceil(Math.random() * 3 * level); //クリック回数の決めるやつ
let music = []
music[0] = new Audio("Quiz-Buzzer01-1.mp3");
music[1] = new Audio("Quiz-Question02-1.mp3");
music[2] = new Audio("Quiz-Wrong_Buzzer01-1.mp3");
music[3] = new Audio("Countdown04-5.mp3");
music[4] = new Audio("Countdown04-6.mp3");
//ここまでが再設定してはいけない関数
function setup() {
    createCanvas(canvassize.w, canvassize.h);
    background(125);
}
function minigame() {
    //ミニゲームの内容。ミニゲームごとに作るが仮状態に一つ。
    //クリック回数のミニゲーム。多すぎても少なすぎてもいけない。
    background(125);
    /*デバッグ用
    textSize(10);
    text(frameCount, 30, 30)
    text(level, 30, 50)
    text(mousecount, 30, 80)
    ここまで*/
    textSize(30);
    text("クリック" + a + "回だけしよ", 60, 200);
    miniflag = 1;//ミニゲーム開始
    seigentimer();//制限時間の表示
}
//クリック処理
function mouseClicked() {
    if (miniflag == 1) {
        mousecount++;
    }
}
//制限時間を設ける
function seigentimer() {
    let keisan =gametimer-(frameCount%gametimer);
    rect(10, 300, keisan, 10)
    //デバッグ用
    //text(keisan, 10, 10)
    //ここまで
    if (keisan <= 180 && keisan > 120) {
        text("３", 10, 280);
        if (keisan == 170) {
            music[3].currentTime = 0;
            music[3].play()
        }
    } else if (keisan <= 120 && keisan > 60) {
        text("2", 10, 280);
        if (keisan == 110) {
            music[3].currentTime = 0;
            music[3].play()
        }
    } else if (keisan <= 60) {
        text("1", 10, 280);
        if (keisan == 50) {
            music[4].currentTime = 0;
            music[4].play()
        }
    }
}
function main() {
    //ここにメインのハート表示とかをする。
    background(125);
    //デバッグ用フレームカウンター
    /*
    textSize(10);
    text(frameCount, 30, 30)
    */
    //ここまで
    miniflag = 0;
    textSize(50);
    if (hart == 4) {
        //ハートがいくつあるかによって条件を変えていく。
        text("♥♥♥♥", 100, 100)
        text(count, 180, 180)
    } else if (hart == 3) {
        text("♥♥♥", 100, 100)
        text(count, 180, 180)
    } else if (hart == 2) {
        text("♥♥", 100, 100)
        text(count, 180, 180)
    } else if (hart == 1) {
        text("♥", 100, 100)
        text(count, 180, 180)
    } else {
        text(count-1, 180, 120)
        textSize(35);
        text("gameover", 130, 200) //後で調整
        noLoop(); //これより処理を行わないようにする。
    }
    if (frameCount % minigametimer > gametimer ) {
        //ハートの表示が終了すると次のミニゲームになる
        minigame()
    }
    //クリア判定
    minigameclear()
}
//ミニゲームのくりあ判定
function minigameclear() {
    if (frameCount > minigametimer && frameCount % minigametimer == 10) {
        if (a != mousecount) {
            music[2].currentTime = 0;
            music[2].play()
        } else {
            music[0].currentTime = 0;
            music[0].play()
        }
    }
    if (frameCount > minigametimer && frameCount % minigametimer == 70) {
        if (a != mousecount) hart--;
        count++
        if (count % 4 == 0 && level < 3) {
            level++
        }
        mousecount = 0
        a=Math.ceil(Math.random() * 3 )*level;
    }
    if (frameCount % minigametimer == 80) {
        music[1].play()
    }
}
//描く
function draw() {
    main();
}