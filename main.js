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
//ここまでが再設定してはいけない関数
function setup() {
    createCanvas(canvassize.w, canvassize.h);
    background(125);
}
function minigame(level, a) {
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
}
//クリック処理
function mouseClicked() {
    if (miniflag == 1) {
        mousecount++;
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
        minigame(level, a)
    }
    //クリア判定
    minigameclear()
}
//ミニゲームのくりあ判定
function minigameclear() {
    if (frameCount > minigametimer && frameCount % minigametimer == 50) {
        if (a != mousecount) {
            hart--
            music[2].currentTime = 0;
            music[2].play()
        } else {
            music[0].currentTime = 0;
            music[0].play()
        }
        mousecount = 0
        count++
        if (count % 4 == 0 && level < 3) {
            level++
        }
        a=Math.ceil(Math.random() * 2 )+Math.ceil(Math.random() * level);
    }
    if (frameCount % minigametimer == 150) {
        music[1].play()
    }
}
//描く
function draw() {
    main();
}