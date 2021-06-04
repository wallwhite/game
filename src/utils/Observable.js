class Observable {
    constructor(...observers) {
        this.observers = observers;
    }

    subscribe(...observer) {
        const [next, complete = () => {}] = observer;

        const observerD = { next, complete };

        this.next = next;

        this.observers.forEach(item => {
            observerD.next(item);
        });

        observerD.complete();
    }

    unsubscribe(fn) {
        this.observers = this.observers.filter(item => item !== fn);
    }
}

export default Observable;
