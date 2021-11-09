import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { SxProps } from "@mui/system";
import React from "react";

interface Props {
  centerLetter: string;
  letters: string[];
  onClick: (letter: string) => void;
}

const style: SxProps<Theme> = {
  padding: "2.5em",
  // border: "1px solid grey",
  textAlign: "center",
  textTransform: "capitalize",
  ":hover": {
    cursor: "pointer",
    backgroundColor: "#efefef",
  },
};

const Tiles: React.FC<Props> = ({ centerLetter, letters, onClick }) => {
  letters = letters.filter((letter) => letter !== centerLetter);
  return (
    <Grid container spacing={3}>
      {letters.map((letter, index) => (
        <React.Fragment key={`GameBoard${index}`}>
          <Grid item xs={4} key={`GameBoard${index}`}>
            <Paper sx={style} onClick={onClick.bind(this, letter)}>
              {letter}
            </Paper>
          </Grid>
          {index === 2 ? (
            <Grid item xs={12} key={`GameBoard${index}Center`}>
              <Paper sx={style} onClick={onClick.bind(this, centerLetter)}>
                {centerLetter}
              </Paper>
            </Grid>
          ) : null}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default Tiles;
