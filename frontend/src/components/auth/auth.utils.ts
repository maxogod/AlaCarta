const passwordIsValid = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
};

const urlSuffixIsValid = (urlSuffix: string) => {
    const urlSuffixRegex = /^[a-zA-Z0-9]+$/;
    return urlSuffixRegex.test(urlSuffix);
};

export { passwordIsValid, urlSuffixIsValid };
