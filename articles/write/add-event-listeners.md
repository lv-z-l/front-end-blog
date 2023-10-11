---
title: 通用的添加事件监听器
author: lvzl
---

```js
class bindEvent {
    constructor(element) {
        this.element = element;
    }
    addEventListener = (type, handler) => {
        if (this.element.addEventListener) {
            this.element.addEventListener(type, handler, false);
        } else if (this.element.attachEvent) {
            const element = this.element;
            this.element.attachEvent('on' + type, () => {
                handler.call(element);
            });
        } else {
            this.element['on' + type] = handler;
        }
    }

    removeEventListener = (type, handler) => {
        if (this.element.removeEventListener) {
            this.element.removeEventListener(type, handler, false);
        } else if (this.element.detachEvent) {
            const element = this.element;
            this.element.detachEvent('on' + type, () => {
                handler.call(element);
            });
        } else {
            this.element['on' + type] = null;
        }
    }

    static stopPropagation(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }

    static preventDefault(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    }
}
```