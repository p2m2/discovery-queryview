export default class Utils {

    static isUrl(s : string) {
      /* eslint-disable */
       var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
       return regexp.test(s);
    }
  
    static truncate(_string : string, n: number) {
      if (_string.length > n) {
        return _string.substring(0 ,n) + "..."
      } else {
        return _string
      }
    }
  
    static splitUrl(url : string) : string {
      let splitList = url.split('/')
      // take last elem
      let last = splitList[splitList.length - 1]
      let splitList2 = last.split('#')
      return decodeURI(splitList2[splitList2.length - 1])
    }
  
    static humanFileSize (bytes : number, si : boolean) {
      let thresh = si ? 1000 : 1024
      if (Math.abs(bytes) < thresh) {
        return bytes + ' B'
      }
      let units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
      let u = -1
      do {
        bytes /= thresh
        ++u
      } while (Math.abs(bytes) >= thresh && u < units.length - 1)
      return bytes.toFixed(1) + ' ' + units[u]
    }
  
    static humanDate (date : number) {
      let event = new Date(date * 1000)
      return event.toUTCString()
    }
  /*
    static objectHaveKeys(obj : Object, level, ...rest) {
      if (obj === undefined) return false
      if (rest.length == 0 && obj.hasOwnProperty(level)) return true
      return this.objectHaveKeys(obj[level], ...rest)
    }
  
    static isFunction(functionToCheck) {
      return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
    }
  */
    static stringToHexColor (str : string ) {
      // first, hash the string into an int
      let hash = 0
      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
      }
      // Then convert this int into a rgb color code
      let c = (hash & 0x00FFFFFF).toString(16).toUpperCase()
      let hex = '#' + '00000'.substring(0, 6 - c.length) + c
      return hex
    }
  
    static isDarkColor(hex : string ) {
      let c = hex.substring(1)    // strip #
      let rgb = parseInt(c, 16)   // convert rrggbb to decimal
      let r = (rgb >> 16) & 0xff  // extract red
      let g = (rgb >>  8) & 0xff  // extract green
      let b = (rgb >>  0) & 0xff  // extract blue
  
      let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709
  
      if (luma < 128) {
        return true
      }
      return false
    }
  
  }
  