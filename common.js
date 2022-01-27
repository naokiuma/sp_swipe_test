
// //スマホ。ドラッグ時に反応
$(window).on('load',function() {

    const default_wrap_height = $(".js_sp_drag_area").height();//デフォルトの外枠の高さ
    const draggingHeight = $(".js_sp_drag_area .banner_loading").height() + $(".js_sp_drag_area").height() + 10;//ドラッグ中の高さ
    let maxHeight = $(".js_sp_drag_area .banner_img").height();//設定バナーの高さ。表示時にはこのサイズにする
    let touchFlg = false;
    let dragFlg = false;
    let completeFlg = false;
    let nowBannerHeight;//現在の表示エリアの高さ
    let startTime;//ドラッグ開始時間
    
    
    
    $(".js_sp_drag_area").css("max-height",maxHeight);//外枠のmax-heightを指定。


    //タッチ開始-------------
    // $(".js_sp_drag_area").on("touchstart",function(){ //spのみの場合
    $(".js_sp_drag_area").on("dragstart",function(){
    
        if(!completeFlg){
            console.log("タッチした");
            touchFlg = true;
        }
    })

   
    //ドラッグ中-------------
    // $(".js_sp_drag_area").on("touchmove",function(){
    $(".js_sp_drag_area").on("drag",function(){
        if(!completeFlg){
            $(".js_sp_drag_area").css("height",draggingHeight);//外枠のheightを指定。
            console.log(startTime);
            $('.banner_loading').css("display","block");
            // $('.banner_loading').slideToggle();

            if(typeof startTime === 'undefined'){
                console.log("ドラッグした");
                startTime = Date.now();
                console.log('現在の時間' + startTime);
            }
        }
    })

     //タッチ外した瞬間----------
    //  $(".js_sp_drag_area").on("touchend",function(){
    $(".js_sp_drag_area").on("mouseleave",function(){
        console.log("外した");
        if(!completeFlg){
            if(touchFlg && (Date.now() - startTime >= 700 )){//1秒以上ドラッグしたら処理開始
                // console.log("条件を満たした")
                dragFlg = true;
            }
            if(dragFlg && touchFlg){
                console.log("dragFlgとscrollFlgがtrueなので処理する");
                $(".js_sp_drag_area").height(nowBannerHeight).
                animate({height: maxHeight},300,"swing");
                completeFlg = true;//完了。
            }
            touchFlg = false;
            dragFlg = false;
            startTime = undefined;
            $('.banner_loading').css("display","none");
            $(".js_sp_drag_area").css("height",default_wrap_height);//外枠のheightを指定。
        }
    })



})/*close*/


