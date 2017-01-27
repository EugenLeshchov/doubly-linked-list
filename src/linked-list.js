const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;

        this._head = this._tail = new Node();
    }

    append(data) {
        if (this.length === 0) {
            this._head.data = data;
            this.length++;

            return this;
        }

        this._tail.next = new Node(data, this._tail);
        this._tail = this._tail.next;
        this.length++;

        return this;
    }

    head() {
        return this._head.data;
    }

    findNodeAt(index) {
        if (index > this.length || index < 0 || this.length === 0)
            throw new Error(`Node at ${index} is undefined`);

        let node = this._head;

        for (let currentIndex = 0; currentIndex < index; currentIndex++) {
            node = node.next;
        }

        return node;
    }

    tail() {
        if (this.length === 0) return null;

        return this._tail.data;
    }

    at(index) {
        let node = this.findNodeAt(index);

        return node.data;
    }

    insertAt(index, data) {
        if (this.length !== 0) {
            if (index === 0) {
                this._head.prev = new Node(data, null, this._head);
                this._head = this._head.prev;
            } else {
                let node = this.findNodeAt(index);
                node.prev = new Node(data, node.prev, node);
                node.prev.prev.next = node.prev;
            }
        } else {
            this.append(data)
        }
        this.length++;

        return this;
    }

    isEmpty() {
        return !this.length;
    }

    clear() {
        this._head = this._tail = new Node();
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        if (this.length !== 1) {
            if (index === 0) {
                this._head = this._head.next;
            } else if (index === this.length) {
                this._tail = this._tail.prev;
            } else {
                let node = this.findNodeAt(index);
                [node.next.prev, node.prev.next] = [node.prev, node.next];
            }
        } else {
            this.clear();
        }

        this.length--;
        return this;
    }

    reverse() {
        let node = this._head;

        while (node !== null) {
            [node.prev, node.next] = [node.next, node.prev];
            node = node.prev;
        }

        [this._tail, this._head] = [this._head, this._tail];

        return this;
    }

    indexOf(data) {
        let node = this._head;
        let index = 0;

        while (node !== null) {
            if (node.data == data) return index;

            index++;
            node = node.next;
        }

        return -1;
    }
}

module.exports = LinkedList;
