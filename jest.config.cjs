module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',

    moduleNameMapper: {
        '^@readynode/(.*)$': '<rootDir>/src/readynode/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/tests/readynode/setup/setup.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
