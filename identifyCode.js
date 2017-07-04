/**
 * canvas绘制随机验证码
 * @authors Mill (876753183@qq.com)
 * @date    2017-06-30 10:34:03
 * @version 0.0.1
 */
export default class IdentifyCode {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.value = "";
    this.init();
    this.addEventListener();
  }

  init() {
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillStyle = this.randomColor(180, 240);
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.draw();
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  randomColor(min, max) {
    var r = this.randomNumber(min, max);
    var g = this.randomNumber(min, max);
    var b = this.randomNumber(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  draw() {
    this.drawText();
    this.drawLine();
    this.drawCircle();
  }

  /**
   * 绘制文字
   * @return {[type]} [description]
   */
  drawText() {
    var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
    this.value = "";
    for (var i = 0; i < 4; i++) {
      var txt = str[this.randomNumber(0, str.length)];
      this.value += txt;
      this.ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
      this.ctx.font = '40px SimHei';
      var x = 20 + i * 25;
      var y = 50;
      var deg = this.randomNumber(-35, 25);
      //修改坐标原点和旋转角度
      this.ctx.translate(x, y);
      this.ctx.rotate(deg * Math.PI / 180);
      this.ctx.fillText(txt, 0, 0);
      // //恢复坐标原点和旋转角度
      this.ctx.rotate(-deg * Math.PI / 180);
      this.ctx.translate(-x, -y);

    }
  }

  /**
   * 绘制干扰线
   * @return {[type]} [description]
   */
  drawLine() {
    for (var i = 0; i < 8; i++) {
      this.ctx.strokeStyle = this.randomColor(40, 180);
      this.ctx.beginPath();
      this.ctx.moveTo(this.randomNumber(0, this.width), this.randomNumber(0, this.height));
      this.ctx.lineTo(this.randomNumber(0, this.width), this.randomNumber(0, this.height));
      this.ctx.stroke();
    }
  }

  /**
   * 绘制干扰点
   * @return {[type]} [description]
   */
  drawCircle() {
    for (var i = 0; i < 100; i++) {
      this.ctx.fillStyle = this.randomColor(0, 255);
      this.ctx.beginPath();
      this.ctx.arc(this.randomNumber(0, this.width), this.randomNumber(0, this.height), 1, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  /**
   * 清空canvas
   * @return {[type]} [description]
   */
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = this.randomColor(180, 240);
  }

  addEventListener() {
    let that = this;
    this.canvas.onclick = (e) => {
      that.clear();
      that.draw();
    };
  }

  getValue() {
    return this.value;
  }
}
