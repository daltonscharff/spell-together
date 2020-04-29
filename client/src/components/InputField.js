import React from 'react';

const InputField = ({ playerInput = 'test', setPlayerInput }) => (
    <div
        className='inputField'
        contentEditable
        suppressContentEditableWarning={true}
        onChange={(e) => setPlayerInput(e.target.value)}
    >
        {playerInput}
    </div>
);

export default InputField;