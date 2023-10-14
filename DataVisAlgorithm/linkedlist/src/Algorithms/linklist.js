class Node {
  constructor(val) {
    this.val = val;
    this.head = null;
    this.tail = null;
  }
}

export default class linkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(val) {
    if (this.head == null) {
      this.head = this.tail = new Node(val);
    } else {
      let oldTail = this.tail;
      this.tail = new Node(val);
      oldTail.next = this.tail;
    }
  }

  addFirst(val) {
    if (this.head == null) {
      this.head = this.tail = new Node(val);
    } else {
      let oldHead = this.head;
      this.head = new Node(val);
      this.head.next = oldHead;
    }
  }

  deleteLast() {
    let current = this.head;
    if (current == null) return;

    if (current.next == null) {
      return;
    }
    while (current.next.next != null) {
      current = current.next;
    }
    current.next = null;
    this.tail = current;
  }

  deleteFirst() {
    let current = this.head;
    this.head = current.next;
    current = null;
  }

  search(val) {
    let current = this.head;
    let index = 0;
    try {
      while (current !== null) {
        if (current.val === val) {
          return index;
        }
        current = current.next;
        index++;
      }
    } catch (err) {
      return -1;
    }
  }

  display() {
    const list = [];
    let current = this.head;
    while (current != null) {
      list.push(current.val);
      current = current.next;
    }
    return list;
  }
}
