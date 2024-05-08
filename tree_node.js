module.exports = class TreeNode {
    constructor(data, left, right) {
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
        return this.left;
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