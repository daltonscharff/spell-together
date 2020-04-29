import React from 'react';

const containerStyle = {
    display: 'flex',
    justifyContent: 'center'
};
const hexagonStyle = {
    fill: '#e6e6e6',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '6px',
    stroke: 'white',
    cursor: 'pointer'
};
const textStyle = {
    fontWeight: 'bold',
    fontSize: '32px',
    dominantBaseline: 'middle',
    textAnchor: 'middle',
    userSelect: 'none',
    cursor: 'pointer'
};
const hiveStyle = {
    width: '75%',
    maxWidth: '400px',
    margin: '1em auto 2em'
};

const Hive = ({ centerLetter = '', otherLetters = [], addLetter }) => {
    centerLetter = centerLetter.toUpperCase();
    otherLetters = otherLetters.map((letter) => letter.toUpperCase());

    return (
        <div style={containerStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 250 259.8" style={hiveStyle}>
                <defs>
                    <symbol id="hexagon">
                        <polygon points={"25 0, 75 0, 100 43.3, 75 86.6, 25 86.6, 0 43.3"} />
                    </symbol>
                    <symbol id="top">
                        <use href="#hexagon" style={hexagonStyle} />
                        <text x="50%" y="55%" style={textStyle}>
                            {otherLetters[0]}
                        </text>
                    </symbol>
                    <symbol id="top-left">
                        <use href="#hexagon" style={hexagonStyle} />
                        <text x="50%" y="55%" style={textStyle}>
                            {otherLetters[1]}
                        </text>
                    </symbol>
                    <symbol id="top-right">
                        <use href="#hexagon" style={hexagonStyle} />
                        <text x="50%" y="55%" style={textStyle}>
                            {otherLetters[2]}
                        </text>
                    </symbol>
                    <symbol id="bottom-left">
                        <use href="#hexagon" style={hexagonStyle} />
                        <text x="50%" y="55%" style={textStyle}>
                            {otherLetters[3]}
                        </text>
                    </symbol>
                    <symbol id="bottom-right">
                        <use href="#hexagon" style={hexagonStyle} />
                        <text x="50%" y="55%" style={textStyle}>
                            {otherLetters[4]}
                        </text>
                    </symbol>
                    <symbol id="bottom">
                        <use href="#hexagon" style={hexagonStyle} />
                        <text x="50%" y="55%" style={textStyle}>
                            {otherLetters[5]}
                        </text>
                    </symbol>
                    <symbol id="center">
                        <use href="#hexagon" style={{ ...hexagonStyle, fill: '#facd04' }} />
                        <text x="50%" y="55%" style={textStyle}>
                            {centerLetter}
                        </text>
                    </symbol>
                </defs>

                <use href="#top" onClick={() => addLetter(otherLetters[0])} x="75" y="0" width="100" height="86.6" />
                <use href="#top-left" onClick={() => addLetter(otherLetters[1])} x="0" y="43.3" width="100" height="86.6" />
                <use href="#top-right" onClick={() => addLetter(otherLetters[2])} x="0" y="129.9" width="100" height="86.6" />
                <use href="#bottom-left" onClick={() => addLetter(otherLetters[3])} x="150" y="43.3" width="100" height="86.6" />
                <use href="#bottom-right" onClick={() => addLetter(otherLetters[4])} x="150" y="129.9" width="100" height="86.6" />
                <use href="#bottom" onClick={() => addLetter(otherLetters[5])} x="75" y="173.2" width="100" height="86.6" />
                <use href="#center" onClick={() => addLetter(centerLetter)} x="75" y="86.6" width="100" height="86.6" />
            </svg>
        </div>
    );
}

export default Hive;
