class DLLNode {
  constructor({ element = undefined, next = this, prev = this, isSentinel = false }) {
    this.element = element;
    this.next = next;
    this.prev = prev;
    this._active = !isSentinel;
  }

  // Remove record one at a time.
  remove() {
    if (this._active) {
      this.prev.next = this.next;
      this.next.prev = this.prev;
      this._active = false;
      return this.element;
    }
  }
}

class DoublyLinkedList {
  constructor(Node = DLLNode) {
    this.Node = Node;
    this._sentinel = new this.Node({ isSentinel: true });
  }

  // Query
  _head() {
    return this._sentinel.next;
  }

  // Query
  _tail() {
    return this._sentinel.prev;
  }

  // Command
  insertHead(element) {
    const head = new this.Node({element, next: this._head(), prev: this._sentinel});
    this._head().prev = head;
    this._tail().next = head;
    return head;
  }

  // Command
  insertTail(element) {
    const tail = new this.Node({element, next: this._sentinel, prev: this._tail()});
    this._tail().next = tail;
    this._sentinel.prev = tail;
    return tail;
  }

  // Command
  removeHead() {
    return this._head().remove();
  }

  // Command
  removeTail() {
    return this._tail().remove();
  }

  // Command
  // Remove a node between head and tail node.
  remove(node) {
    if (node.remove) {
      return node.remove();
    }
  }

  // Query
  // Iterate through all the records.
  forEach(callback, container = this) {
    let i = 0;
    let node = this._head();
    while (node !== this._sentinel) {
      callback(node.element, i, container);
      i += 1;
      node = node.next;
    }
  }

  // Query
  count() {
    let count = 0;
    this.forEach(() => {
      count += 1});
    return count;
  }
}

export default DoublyLinkedList;
