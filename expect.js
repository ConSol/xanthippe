function expect(argument) {
    let obj = {
        toThrow: () => {
            try {
                argument();
            } catch (e) {
                return;
            }
            throw "exception expected";
        },
        toBe: (val) => {
            if (val !== argument) {
                throw "not equal"
            }
        },
        not: () => {
            return {
                toBe: (val) => {
                    if (val === argument) {
                        throw "equal";
                    }
                },
                not: () => {
                    return obj;
                },
                toThrow: () => {
                    argument();
                }
            }
        }
    }
    return obj;
};
