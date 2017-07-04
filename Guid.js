/**
 * GUID Generator
 * @authors Mill (876753183@qq.com)
 * @date    2017-07-04 15:34:40
 * @version 0.0.1
 */
export default new class GUID {
  /**
   * constructor
   * @return {[type]} [description]
   */
  constructor() {
    this.date = new Date();
  }


  /**
   * [create description]
   * @return {[type]} [description]
   */
  create() {
    var guidStr = '',
      sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16),
      sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
    for (var i = 0; i < 9; i++) {
      guidStr += Math.floor(Math.random() * 16).toString(16);
    }
    guidStr += sexadecimalDate;
    guidStr += sexadecimalTime;
    while (guidStr.length < 32) {
      guidStr += Math.floor(Math.random() * 16).toString(16);
    }
    return this.formatGUID(guidStr).toUpperCase();
  }

  /**
   * get current date GUID type,eg.19700101
   * @return {[String]} [description]
   */
  getGUIDDate() {
    return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
  }

  /**
   * get current datetime GUID type,eg.12300933
   * @return {[type]} [description]
   */
  getGUIDTime() {
    return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero(parseInt(this.date.getMilliseconds() / 10));
  }

  /**
   * [addZero description]

   * @param {[type]} num [description]
   */
  addZero(num) {
    if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
      return '0' + Math.floor(num);
    } else {
      return num.toString();
    }
  }

  /**
   * [hexadecimal description]
   * @param  {[Number]} num [description]
   * @param  {[Number]} x   [description]
   * @param  {[Number]} y   [description]
   * @return {[Number]}     []
   */
  hexadecimal(num, x, y) {      
    if (y != undefined) {        
      return parseInt(num.toString(), y).toString(x);      
    } else {        
      return parseInt(num.toString()).toString(x);      
    }
  }

  /**
   * change a string to GUID String type
   * @return {[String]} [description]
   */
  formatGUID(guidStr) {
    var str1 = guidStr.slice(0, 8) + '-',
      str2 = guidStr.slice(8, 12) + '-',
      str3 = guidStr.slice(12, 16) + '-',
      str4 = guidStr.slice(16, 20) + '-',
      str5 = guidStr.slice(20);
    return str1 + str2 + str3 + str4 + str5;
  }
}
