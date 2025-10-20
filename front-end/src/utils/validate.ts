// 正则对象库
export const validate = {
  // 空值 / 非空
  nonEmpty: /^(?!\s*$).+/, // 至少有一个非空字符
  onlyWhitespace: /^\s*$/, // 仅空白

  // 数字
  integer: /^-?\d+$/, // 整数
  positiveInteger: /^[1-9]\d*$/, // 正整数（不含0）
  nonNegativeInteger: /^\d+$/, // 非负整数（含0）
  float: /^-?\d+(\.\d+)?$/, // 浮点数
  positiveFloat: /^\d+(\.\d+)?$/, // 正浮点数

  // 字母 / 字符
  letters: /^[A-Za-z]+$/, // 仅字母
  lowercaseLetters: /^[a-z]+$/, // 小写字母
  uppercaseLetters: /^[A-Z]+$/, // 大写字母
  lettersAndNumbers: /^[A-Za-z0-9]+$/, // 字母+数字
  lettersNumbersUnderscore: /^\w+$/, // 字母数字下划线

  // 邮箱 / 手机号
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, // 邮箱
  cnPhone: /^1[3-9]\d{9}$/, // 中国手机号
  intlPhone: /^\+\d{1,3}\s?\d{4,14}$/, // 国际手机号

  // URL / IP / 身份证
  url: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/, // URL
  ipv4: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/, // IPv4
  cnIDCard18: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/, // 中国18位身份证

  // 日期 / 时间
  dateHyphen: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
  dateSlash: /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
  timeHM: /^([01]\d|2[0-3]):([0-5]\d)$/, // HH:MM
  timeHMS: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, // HH:MM:SS

  // 密码规则
  passwordSimple: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // 至少8位字母+数字
  passwordStrong: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, // 强密码
  passwordAlnum: /^[A-Za-z0-9]{6,16}$/, // 仅字母数字6-16位

  // 特殊字符 / 中文 / 空白
  chinese: /^[\u4e00-\u9fa5]+$/, // 纯中文
  removeWhitespace: /\s+/g, // 替换空格
  allowedChars: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, // 中文、字母、数字
};
