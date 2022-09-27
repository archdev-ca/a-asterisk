export default class PubSub {
  subscribers: { [key: string]: Function[] };

  constructor() {
    this.subscribers = {};
  }

  // Subscribe to an event
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  // Publish an event
  publish(event) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach((callback) => {
        callback();
      });
    }
  }
}

export interface IPubSub {
  publish: Function;
  subscribe: Function;
}
