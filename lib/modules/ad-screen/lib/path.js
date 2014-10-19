/**
* 代码从NODE 0.11.x的开发主干Copy。
* 实现0.10.x的path模块所没有实现的isAbsolute函数。
*/
var isWindows = process.platform === 'win32';
if (isWindows) {
  // Regex to split a windows path into three parts: [*, device, slash,
  // tail] windows-only
  var splitDeviceRe =
      /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
  // windows version
  exports.isAbsolute = function(path) {
    var result = splitDeviceRe.exec(path),
        device = result[1] || '',
        isUnc = device && device.charAt(1) !== ':';
    // UNC paths are always absolute
    return !!result[2] || isUnc;
  };
} else /* posix */ {
  // posix version
  exports.isAbsolute = function(path) {
    return path.charAt(0) === '/';
  };
}