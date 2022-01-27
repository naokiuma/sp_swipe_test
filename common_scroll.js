

//スマホ。ドラッグ時に反応
$(window).on('load',function() {

    //初期状態の外枠の高さ。この数値より小さくはならない
    const minSize = $(".js_sp_drag_area").height();
    //中にある画像サイズ。最大でこのサイズまでdefault_wrap_heightを大きくする
    const maxSize = $(".js_sp_drag_area img").height();
    //現在の外枠のサイズ
    let now_Wrap_Size = $(".js_sp_drag_area").height();

    let first_touch_postion = 0;//最初にタッチしたところ
    let move_length = 0;//移動距離
    $(".js_sp_drag_area").on("touchstart",start_check);//タッチ開始
    $(".js_sp_drag_area").on("touchmove", move_check);//ドラッグ中
    $(".js_sp_drag_area").on("touchend", end_check);//タッチをはなす

function start_check(event) {
    //console.log("start_check");
    first_touch_postion = 0;
    move_length = 0;
    first_touch_postion = getY(event);;
    // console.log(first_touch_postion);
}


function move_check(event){
    move_length = first_touch_postion - getY(event);
    //console.log(move_length)
    if(move_length < 10){//10px以上動いたら下に移動と判定
        //外枠を大きくする
        now_Wrap_Size = $(".js_sp_drag_area").height();
        if(maxSize > now_Wrap_Size){
            let newheight = Math.abs(move_length / 4) + now_Wrap_Size;//new_size
            if(newheight > maxSize) newheight = maxSize;
            $('.js_sp_drag_area').css({ 'height': newheight});
        }

    }else if(move_length > -10){//下に移動
        //外枠を小さくする
        now_Wrap_Size = $(".js_sp_drag_area").height();
        if(minSize < now_Wrap_Size){
            let newheight = now_Wrap_Size - move_length / 4;//new_size
            if(newheight < minSize) newheight = minSize;
            $('.js_sp_drag_area').css({ 'height': newheight});
        }
    }
}


function end_check(event){
    // console.log('move_length：' + move_length)
    // console.log('first_touch：' + first_touch_postion);
    //reset
    first_touch_postion = 0;
    move_length = 0;

}

function getY(event) {
    //縦方向の座標を取得
    return (event.originalEvent.touches[0].pageY);
}


})/*close*/
