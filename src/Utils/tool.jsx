const Tool = {};

Tool.paramType = data => {
    // data['uid'] = '1';
    // data['token'] = 'pt';
    let paramArr = []; 
    let paramStr = ''; 
    for (let attr in data) {
        paramArr.push(attr + '=' + data[attr]);
    }
    paramStr = paramArr.join('&');
    paramStr = '?' + paramStr;
    return paramStr
}


Tool.ajax = url => {
  return new Promise((resolve, reject) => {
    let xml = new XMLHttpRequest();
    xml.open('get',url,true);
    xml.onload = resolve;
    xml.onerror = reject;
    xml.send();
  } )
}


// let alertText = document.createElement('div');
// alertText.setAttribute('id','alertText');


// let alertDom = document.createElement('div');
// alertDom.setAttribute('id','alertTip');
// alertDom.appendChild(alertText);

// document.body.appendChild(alertDom);
// let timer = null;
// Tool.alert =  (msg, msg2) => {
//     clearTimeout(timer);
//     if (msg2) {
//         alertText.innerHTML = msg+'<div class="alert_bottom">'+ msg2 +'</div>';
//     }else{
//         alertText.innerHTML = msg;
//     }
//     alertDom.style.display = 'block';
//     alertDom.onclick = () => {
//         clearTimeout(timer);
//         alertDom.style.display = 'none';
//     }
//     timer = setTimeout( () => {
//        alertDom.style.display = 'none';
//        clearTimeout(timer);
//     },3000)
// }

Tool.getStyle = (obj, attr) => { 
    if(obj.currentStyle){ 
        return obj.currentStyle[attr]; 
    } 
    else{ 
        return document.defaultView.getComputedStyle(obj,null)[attr]; 
    } 
} 

Tool.nextPage = (dom, currentPage, totalPage,callback, shouldUpdata) => { //分页
    let updata = shouldUpdata;
    let page = currentPage;
    let height = 0;
    let windowHeight = window.screen.height;
    let setTop = 0;
    let Bottom = 0;
    let oldScrollTop = 0;
    let timer = null;
    dom.addEventListener('touchstart',() => {
        height = dom.offsetHeight;
        setTop = dom.offsetTop;
        Bottom = parseInt(Tool.getStyle(dom,'marginBottom'));
    },false)
    dom.addEventListener('touchmove',() => {
       loadMore();
    },false)
    dom.addEventListener('touchend',() => {
       oldScrollTop = document.body.scrollTop
        moveEnd()
    },false)
    
    let requestID;
    const moveEnd = () => {
        requestID = requestAnimationFrame(() => {
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                moveEnd()
            }else{
                loadMore();
            }
        })
    }

    const loadMore = () => {
        if ((page < totalPage)&&(updata==true)) {
            if (document.body.scrollTop+windowHeight >= height+setTop+Bottom) {
                cancelAnimationFrame(requestID)
                page++;
                updata = false;
                callback(page);
            }
        }
    }
}
/**
 * 格式化时间
 * 
 * @param {any} t
 * @returns
 */
Tool.formatDate = function (str) {
    var date = new Date(str);
    var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前';
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前';
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前';
    } else {
        return parseInt(time / 31536000000) + '年前';
    }
}
/**
 * 本地数据存储或读取
 * 
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tool.localItem = function (key, value) {
    if (arguments.length == 1) {
        return localStorage.getItem(key);
    } else {
        return localStorage.setItem(key, value);
    }
}
/**
 * 删除本地数据
 * 
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function (key) {
    if (key) {
        return localStorage.removeItem(key);
    }
    return localStorage.removeItem();
}
/**
 * 获取cookie数据
 * @param key
 */
Tool.getCookie = function (key) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)
    if (arr) {
      return decodeURIComponent(arr[2])
    } else {
      return null
    }
}


export { Tool }
