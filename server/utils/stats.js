const getAnswerLengths = (answers) => {
    const answerLengths = [];
    answers.forEach((answer) => {
        let answerLength = answer.word.length;
        answerLengths[answerLength] = answerLengths[answerLength] + 1 || 1;
    });
    return answerLengths;
};

module.exports = { getAnswerLengths };