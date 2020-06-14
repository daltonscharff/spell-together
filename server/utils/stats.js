const getAnswerLengths = (answers) => {
    const answerLengths = {};
    answers.forEach((answer) => {
        let length = answer.length.toString();
        answerLengths[length] = answerLengths[length] ? answerLengths[length] + 1 : 1;
    });
    return answerLengths;
};

module.exports = { getAnswerLengths };