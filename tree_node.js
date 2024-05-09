module.exports = class TreeNode {
    constructor(data, left = null, right = null) {
        this._data = data;
        this._left = left;
        this._right = right;
    }

    get data() {
        return this._data;
    }

    set data(newData) {
        this._data = newData;
    }
    
    get left() {
        return this._left;
    }

    set left(newLeft) {
        this._left = newLeft;
    }

    get right() {
        return this._right;
    }
    
    set right(newRight) {
        this._right = newRight;
    }
    
}