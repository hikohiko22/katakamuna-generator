(() => {
    'use strict';
  
    // ----------------------------------------------
    // canvasの設定
    // ----------------------------------------------
    
    // canvasを使用する要素を取得
    const canvas = document.getElementById('canvas');
    // canvasの背景を指定
    canvas.style.backgroundColor = 'black'
    // canvasの2Dグラフィックオブジェクトを取得
    const ctx = canvas.getContext('2d');
  
  
    // ----------------------------------------------
    // 座標の作成
    // ----------------------------------------------
  
    // 座標の中心の値を決める
    const centerX = 500;
    const centerY = 500;
  
    // x軸とy軸を描く
    ctx.beginPath();
    ctx.moveTo(centerX - 500, centerY); //x軸パスの始点
    ctx.lineTo(centerX + 500, centerY); //x軸パスの終点
    ctx.moveTo(centerX, centerY - 500); //y軸パスの始点
    ctx.lineTo(centerX, centerY + 500); //y軸パスの終点
    ctx.strokeStyle = "white";  //パスの色
    ctx.lineWidth = 0.5;  //パスの太さ
    ctx.stroke();
    
  
    btn.addEventListener('click' , () => {
  
      // ----------------------------------------------
      // 描画の間隔（角度の取得）
      // ----------------------------------------------
      const stepTheta = parseFloat(document.getElementById('input_step_theta').value);
      
      // ----------------------------------------------
      // 対数螺旋を描く
      // ----------------------------------------------
      
      // θの初期化
      let theta = 0;
  
      // 定数の定義（r = ae^bθ の aとbの定義）
      const a = parseFloat(document.getElementById('input_a').value); //原点からの距離 (a>0)
      const b = parseFloat(document.getElementById('input_b').value);
  
      // setIntervalを用いることでアニメーション描画にする
      const drawing =  setInterval(() => {
  
        // ラジアンをもとめる
        const radians = theta * Math.PI / 180;
  
        // 半径を求める  r = ae^bθ
        const radius = a * Math.pow(Math.E, b * radians);
  
        // xとyの距離を求める
        const x = Math.cos(radians) * radius;
        const y = Math.sin(radians) * radius;
        
        // コンソールにθと座標を出力する
        console.log(`θ：${theta}`);
        console.log(`x = ${x} : y = ${y}`);
  
        // 座標へ線を描画する
        // 線の色は緑色で太さ1、大きさは3×3
        // yはcanvasでは下方向へ加算されるので、-をつけて反転させておく
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x + centerX, -y + centerY);
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 1;  
        ctx.stroke();
          
        // 座標へ点を描画する
        // 点の色は黄色、大きさは3×3
        // yはcanvasでは下方向へ加算されるので、-をつけて反転させておく
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x + centerX, -y + centerY, 3, 3);
  
        // θに5度足して次へすすむ
        theta = theta + stepTheta;
  
        if (b === 0) {
          if (theta > 360) {
            clearInterval(drawing);
          }
        } else if (b > 0) {
          // xかyの距離が1より大きくなったら終了
          if (Math.abs(x) > 500 || Math.abs(y) > 500) {
            clearInterval(drawing);
          }
        } else if (b < 0) {
          // xとyの距離が双方1より小さくなったら終了
          if (Math.abs(x) < 1 && Math.abs(y) < 1) {
            clearInterval(drawing);
          }
        }
  
      }, 1);  //1msec毎に繰り返す
    });
    
  })();