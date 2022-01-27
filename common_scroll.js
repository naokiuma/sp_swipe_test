





// //スマホ。ドラッグ時に反応
$(window).on('load',function() {

    //初期状態の外枠の高さ。この数値より小さくはならない
    const minSize = $(".js_sp_drag_area").height();
    //中にある画像サイズ。最大でこのサイズまでdefault_wrap_heightを大きくする
    const maxSize = $(".js_sp_drag_area img").height();
    //現在の外枠のサイズ
    let now_Wrap_Size = $(".js_sp_drag_area").height();
    let before_Wrap_size = '';


    let first_touch_postion = 0;//最初にタッチしたところ
    let move_length = 0;//移動距離

    $(".js_sp_drag_area").on("touchstart",start_check);//タッチ開始
    $(".js_sp_drag_area").on("touchmove", move_check);//ドラッグ中
    $(".js_sp_drag_area").on("touchend", end_check);//タッチをはなす


    console.log("それぞれの高さ---");
    console.log('デフォルトの外枠：' + minSize);
    console.log('max画像サイズ：' + maxSize);
    console.log('現在の外枠サイズ：' + now_Wrap_Size);

    console.log("---------------");


    // console.log("開始:Y位置");
    // console.log(first_touch_postion);


function start_check(event) {
    console.log("start_checkスタート");
    /** 現在の座標取得 */

    // /** 移動距離状態を初期化 */
    first_touch_postion = 0;
    move_length = 0;
    // /** 表示メッセージを初期化 */
    // msgY = '';
    // msgX = '';

    first_touch_postion = getY(event);;
    //console.log('現在のy位置');
    //console.log(posiY);
    console.log("おしはじめた時のY位置");
    console.log(first_touch_postion);

}


function move_check(event){
    // console.log('現在の位置');

    // console.log(first_touch_postion)
    // console.log(getY(event));
    move_length = first_touch_postion - getY(event);
    console.log(move_length)

    if(move_length < 10){
        console.log('下に移動');
        
        //外枠を大きくする処理
        now_Wrap_Size = $(".js_sp_drag_area").height();
        if(maxSize > now_Wrap_Size){
            let newheight = Math.abs(move_length / 3) + now_Wrap_Size;//新しいサイズ
            if(newheight > maxSize) newheight = maxSize;

            $('.js_sp_drag_area').css({ 'height': newheight});
        }

    }else if(move_length > -10){
        console.log('上に移動した');

        //外枠を小さくする処理
        now_Wrap_Size = $(".js_sp_drag_area").height();
        if(minSize < now_Wrap_Size){
            let newheight = now_Wrap_Size - move_length / 3;//新しいサイズ
            if(newheight < minSize) newheight = minSize;
            $('.js_sp_drag_area').css({ 'height': newheight});
        }

    }
}

function end_check(event){

    //結果
    console.log('move_length：' + move_length)
    console.log('first_touch：' + first_touch_postion);

   
    // console.log("移動距離：")
    // console.log(move_length - first_touch_postion);

    //reset
    first_touch_postion = 0;
    move_length = 0;

}


function getY(event) {
    //縦方向の座標を取得
    //console.log((event.originalEvent.touches[0].screenY));
    return (event.originalEvent.touches[0].pageY);
}


})/*close*/
