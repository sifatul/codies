const DateString = (time: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    const today = new Date(time);

    return today.toLocaleDateString('en-US', options);
};
export { DateString };
