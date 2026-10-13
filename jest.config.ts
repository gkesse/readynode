module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    moduleNameMapper: {
        '^@readynode/(.*)$': '<rootDir>/src/readynode/$1'
    }
};
