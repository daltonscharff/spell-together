import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

type Props = {
  records: any[];
};

export function GameOutput({ records }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleIsExpanded = () => setIsExpanded((isExpanded) => !isExpanded);
  return (
    <Box>
      Found Words: {records.length}
      {isExpanded ? (
        <ArrowDropDownIcon onClick={toggleIsExpanded} />
      ) : (
        <ArrowLeftIcon onClick={toggleIsExpanded} />
      )}
      {isExpanded &&
        records.map((record) => (
          <div>
            {record.word.word}
            {record.username}
            {record.word.definition}
          </div>
        ))}
    </Box>
  );
}
