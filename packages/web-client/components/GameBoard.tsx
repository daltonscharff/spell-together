import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SxProps } from "@mui/system";
import React from "react";

interface Props {
  centerLetter: string;
  letters: string[];
  onClick: (letter: string) => void;
}

const style: SxProps<Theme> = {
  padding: "1em",
  border: "1px solid grey",
  textAlign: "center",
  textTransform: "capitalize",
};

const GameBoard: React.FC<Props> = ({ centerLetter, letters, onClick }) => {
  letters = letters.filter((letter) => letter !== centerLetter);
  return (
    <Grid container spacing={3}>
      {letters.map((letter, index) => (
        <React.Fragment key={`GameBoard${index}`}>
          <Grid item xs={4} key={`GameBoard${index}`}>
            <Box sx={style} onClick={onClick.bind(this, letter)}>
              {letter}
            </Box>
          </Grid>
          {index === 2 ? (
            <Grid item xs={12} key={`GameBoard${index}Center`}>
              <Box sx={style} onClick={onClick.bind(this, centerLetter)}>
                {centerLetter}
              </Box>
            </Grid>
          ) : null}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default GameBoard;
