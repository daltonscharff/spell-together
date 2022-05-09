import { useState } from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

type Props = {
  records: any[];
};

const PaddedBox = styled(Box)`
  padding: 1em 1.5em;
`;

export function GameOutput({ records }: Props) {
  // const [isExpanded, setIsExpanded] = useState(true);
  // const toggleIsExpanded = () => setIsExpanded((isExpanded) => !isExpanded);
  return (
    <div>
      <Paper variant="outlined">
        <Stack divider={<Divider />}>
          <PaddedBox>Found Words: {records.length}</PaddedBox>
          <PaddedBox>
            <Stack divider={<Divider />} spacing={2}>
              {records.map((record) => (
                <Box>
                  {record.word.word}
                  {record.username}
                  {record.word.definition}
                </Box>
              ))}
            </Stack>
          </PaddedBox>
          <PaddedBox>Great Start: 30/130 pts.</PaddedBox>
        </Stack>
      </Paper>
    </div>
  );
}
