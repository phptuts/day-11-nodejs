const transFormValidationErrorToFormResponse = (validationError) => {
    return validationError.inner.reduce((acc, next) => {
        if (acc[next.path]) {
            acc[next.path].push(next.message);
        } else {
            acc[next.path] = [next.message];
        }

        return acc;
    }, {});
}

module.exports = transFormValidationErrorToFormResponse;