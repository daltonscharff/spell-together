export const HelpText = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-semibold text-xl">How to Play</p>
      <p className="font-light">
        Compete to see who can create the most words using letters from the
        hive.
      </p>
      <ul className="font-light pl-3 list-disc list-inside">
        <li className="pl-4 indent-[-1rem]">
          Words must contain at least 4 letters.
        </li>
        <li className="pl-4 indent-[-1rem]">
          Words must include the center letter.
        </li>
        <li className="pl-4 indent-[-1rem]">
          Our word list does not include words that are obscure, offensive,
          hyphenated, or proper nouns.
        </li>
        <li className="pl-4 indent-[-1rem]">
          Letters can be used more than once.
        </li>
        <li className="pl-4 indent-[-1rem]">
          Each puzzle includes at least one “pangram” which uses every letter.
        </li>
      </ul>
    </div>
  );
};
