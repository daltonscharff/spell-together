CREATE INDEX word_with_puzzle_id_puzzle_id_word_idx ON public.word_with_puzzle_id USING btree (puzzle_id, word);


