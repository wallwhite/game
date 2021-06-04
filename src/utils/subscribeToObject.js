/* eslint-disable no-param-reassign */
import Observable from './Observable';

const subscribeToObject = target => {
    const subject = new Observable();
    const proxy = new Proxy(target, {
        set(proxyTarget, key, val) {
            const oldValue = proxyTarget[key];

            proxyTarget[key] = val;

            subject.next({
                type: oldValue === undefined ? 'add' : 'change',
                object: target,
                name: key,
                oldValue,
            });

            return true;
        },
    });

    return [proxy, subject];
};

export default subscribeToObject;
