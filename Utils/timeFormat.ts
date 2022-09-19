const DateString = (time: string) => {
    let options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    let today = new Date(time);

    return today.toLocaleDateString('en-US', options);
};
export { DateString };
