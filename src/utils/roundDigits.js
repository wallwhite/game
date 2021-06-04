const roundDigits = (num, digits = 6) => {
    const delta = 10 ** digits;

    return Math.round(num * delta) / delta;
};

export default roundDigits;
