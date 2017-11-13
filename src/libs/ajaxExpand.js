const _contentTypes = {
    html: 'text/html',
    json: 'application/json',
    file: 'multipart/form-data',
    text: 'text/plain',
    form: 'application/x-www-form-urlencoded',
    formData: '',
    default: 'text/plain'
  },
  _accepts = {
    xml: 'application/xml, text/xml',
    html: 'text/html',
    script: 'text/javascript, application/javascript',
    json: 'application/json, text/javascript',
    text: 'text/plain',
    _default: '*/*'
  },
  isFormData = !!window.FormData;
// 解决IE9 不支持异步文件提交的问题
function createFormForFile(file, that, key) {
  if (that.fileForm && that.fileIframe) {
    let i,
      len,
      ifame = that.fileIframe,
      form = that.fileForm;
    ifame.style.cssText = 'display:none';
    file.name = key;
    ifame.name = key + 'load';
    form.target = key + 'load';
    form.method = 'post';
    form.enctype = 'multipart/form-data';
    form.style.cssText = 'display:inline-block';
    ifame.onload = () => {
      let body = ifame.contentWindow.document.body,
        result = [];
      for (i = 0, len = body.childNodes.length; i < len; i++) {
        if (body.childNodes[i].nodeType === 3) {
          result.push(body.childNodes[i].nodeValue);
        }
      }
      result = result.join('');
      that.result = result;
      that.dataInf.onSuccess(result);
      console.log('图片上传成功');
    };
  }
}
function isDomObject(obj, type) {
  let result;
  if (obj === null || undefined) {
    result = false;
  }
  if (typeof obj === 'object' && obj.nodeType === 1) {
    if (!type || type === 'all' || type.nodeName.toLowerCase() === type.toLowerCase()) {
      result = true;
    } else {
      result = false;
    }
  }
  return result;
}
// 获取header对象
function getHeader(xhr) {
  const headerStr = xhr.getAllResponseHeaders();
  let itemsStr = headerStr.split('\n'),
    header = {};
  itemsStr.pop();
  itemsStr.forEach((itemStr) => {
    let item = itemStr.replace(' ', '').split(':');
    header[item[0].toLowerCase()] = item[1];
  });
  return header;
}

// 设置xhr的header

function setHeader(xhr, header) {
  let key;
  for (key in header) {
    xhr.setRequestHeader(key, header[key]);
  }
}

// 对ajax上传的数据进行处理
function encodeData() {
  let data = '',
    key,
    i,
    handleData = this.handleData,
    dataObj = this.preData,
    dataType = this.dataType,
    len;
  if (typeof handleData === 'function') {
    data = handleData(dataObj);
  } else {
    switch (dataType) {
      case 'text':
        data = dataObj;
        break;
      case 'form':
        if (typeof dataObj === 'object') {
          for (key in dataObj) {
            let value = typeof dataObj[key] === 'object' ? JSON.stringify(dataObj[key]) : encodeURIComponent(dataObj[key]);
            if (data !== '') {
              data += '&' + key + '=' + value;
            } else {
              data += key + '=' + value;
            }
          }
        } else {
          data = dataObj;
        }
        break;
      case 'json':
        data = JSON.stringify(dataObj);
        break;
      case 'file':
        data = dataObj;
        for (key in dataObj) {
          if (isFormData) {
            let files = dataObj[key];
            if (files.length > 0) {
              data = new FormData();
              for (i = 0, len = files.length; i < len; i++) {
                data.append(key, files[i]);
              }
            }
          } else {
            if (!this.fileByForm) {
              this.fileByForm = false;
            }
            createFormForFile(dataObj[key], this, key);
          }
        }
        break;
      case 'formData':
        data = new FormData();
        for (key in dataObj) {
          if ({}.toString.call(dataObj[key]) === '[object FileList]') {
            let files = dataObj[key];
            for (i = 0, len = files.length; i < len; i++) {
              data.append(key, files[i]);
            }
          } else if (dataObj[key] !== undefined) {
              data.append(key, dataObj[key]);
          }
        }
        break;
      default:
        data = dataObj;
    }
  }
  return data;
}
// ajax对象
function Ajax(ajaxInf) {
  this.type = ajaxInf.type || 'get'; // post or get
  this.dataType = ajaxInf.dataType || 'text'; // 上传的数据类型:text,form,json,file
  this.charset = ajaxInf.charset;// 上传数据的编码格式,如:utf-8
  this.async = ajaxInf.async || false;// 是否异步
  this.timeOut = ajaxInf.timeOut;// 超时时间
  this.accept = _accepts[ajaxInf.accept] || ajaxInf.accept || _accepts._default;// 告知后台希望拿到什么样的数据
  this.handleData = ajaxInf.handleData || null; // 用户自定义的处理上传数据的函数
  this.handleResult = ajaxInf.handleResult; // 处理后台返回的数据
  this.preData = ajaxInf.data;
  this.url = ajaxInf.url;
  this.onProgress = ajaxInf.onProgress;
  this.onAbort = ajaxInf.onAbort;
  this.onError = ajaxInf.onError;
  this.onFail = ajaxInf.onFail;
  this.onTimeOut = ajaxInf.onTimeOut;
  this.onSuccess = ajaxInf.onSuccess;
  this.header = ajaxInf.header;
  this.data = null;
  this.xhr = new XMLHttpRequest();
  this.contentType = _contentTypes[ajaxInf.contentType] || ajaxInf.contentType || 'text/plain';
  this.contentType = this.charset ? this.contentType + ';charset=' + this.charset : this.contentType + ';charset=utf-8';
  this.fileByForm = this.dataType === 'file' && !isFormData;
  this.fileForm = ajaxInf.fileForm || null;
  this.fileIframe = ajaxInf.fileIframe || null;
}
Ajax.prototype = {
  constructor: Ajax,
  send(bindObj) {
    let xhr = this.xhr,
      timeOut = this.timeOut,
      async = this.async,
      type = this.type,
      dataType = this.dataType,
      contentType = this.contentType,
      accept = this.accept,
      header = this.header,
      handleResult = this.handleResult,
      url = this.url,
      data = this.data ? this.data : encodeData.call(this),
      onProgress = this.onProgress,
      onAbort = this.onAbort,
      onError = this.onError,
      onSuccess = this.onSuccess,
      onFail = this.onFail,
      onTimeOut = this.onTimeOut,
      onEnd = this.onEnd,
      timeoutFlag = false,
      timer;
    if (!this.fileByForm) {
      this.stopFlag = false;
      this.data = data;
      if (!bindObj) {
        bindObj = this;
      }
      // 进度
      if (onProgress) {
        try {
          xhr.onprogress = function (e) {
            if (e.total > 0) {
              onProgress.call(bindObj, e.loaded, e.total);
            }
          };
        } catch (e) { console.log(e); }
      }
      // 中断
      if (onAbort) {
        try {
          xhr.onabort = function () {
            if (this.stopFlag) {
              onAbort.call(bindObj, xhr.status);
            }
          };
        } catch (e) { console.log(e); }
      }
      // 发生错误
      if (onError) {
        try {
          xhr.onerror = function () {
            onError.call(bindObj);
          };
        } catch (e) { console.log(e); }
      }
      xhr.onreadystatechange = function () {
        let readyState = xhr.readyState;
        if (readyState === 4) {
          let status = xhr.status;
          if (timer) {
            clearTimeout(timer);
          }
          timeoutFlag = false;
          if ((status >= 200 && status < 300) || status === 304) {
              onSuccess && onSuccess.call(bindObj, handleResult ? handleResult(xhr.responseText) : xhr.responseText, getHeader(xhr));
          } else if (!this.stopFlag && !timeoutFlag) {
              onFail && onFail.call(bindObj, status);
          }
          onEnd && onEnd.call(bindObj);
        }
        if (readyState === 1 && timeOut) {
          timer = setTimeout(() => {
            timeoutFlag = true;
            if (async && timeoutFlag) {
              xhr.abort();
              if (onTimeOut) {
                onTimeOut.call(bindObj);
              }
            }
          }, timeOut);
        }
      };
      if (type === 'post') {
        xhr.open(type, url, async);
      } else if (type === 'get') {
        if (data) {
          xhr.open(type, url + '?' + data, async);
        } else {
          xhr.open(type, url, async);
        }
      }
      if (dataType !== 'file' && dataType !== 'formData') {
        xhr.setRequestHeader('Content-Type', contentType);
      }
      xhr.setRequestHeader('Accept', accept);
      if (header) {
        setHeader(xhr, header);
      }
      if (type === 'get') {
        xhr.send(null);
      } else {
        xhr.send(data);
      }
    } else if (this.fileForm) {
      this.fileForm.action = url;
      this.fileForm.submit();
    }
  },
  stop() {
    let xhr = this.xhr;
    if (xhr && !isDomObject(xhr)) {
      this.stopFlag = true;
      xhr.abort();
    }
  },
  setData(newData) {
    this.preData = newData;
    this.data = encodeData.call(this);
  }
};
// ajaxExpand对象
const ajaxExpand = {
  init(ajaxInf) {
    return new Ajax(ajaxInf);
  }
};
export default ajaxExpand;
