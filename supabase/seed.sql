DO $$
DECLARE
  puzzle_1_id UUID;
  puzzle_2_id UUID;
BEGIN

  INSERT INTO puzzle (date,outer_letters,center_letter,max_score)
  VALUES 
    ('2022-01-29','{"a","i","y","l","o","f"}','c',224)
  RETURNING id INTO puzzle_1_id;

  INSERT INTO puzzle (date,outer_letters,center_letter,max_score)
  VALUES 
    ('2022-01-01','{"k","o","m","l","n","w"}','a',119)
  RETURNING id INTO puzzle_2_id;

  INSERT INTO room (shortcode)
  VALUES 
    ('abcdef'), 
    ('aaaaaa');

  WITH puzzle_1_word_ids AS (
    INSERT INTO word (word,point_value,is_pangram,definition,part_of_speech)
    VALUES
      ('callaloo',8,FALSE,NULL,NULL),
      ('acai',1,FALSE,NULL,NULL),
      ('focaccia',8,FALSE,NULL,NULL),
      ('cacao',5,FALSE,'tropical American tree producing cacao beans','noun'),
      ('calcify',7,FALSE,'become impregnated with calcium salts','verb'),
      ('cloaca',6,FALSE,'a waste pipe that carries away sewage or surface water','noun'),
      ('cool',1,FALSE,'great coolness and composure under strain','noun'),
      ('cocoa',5,FALSE,'a beverage made from cocoa powder and milk and sugar; usually drunk hot','noun'),
      ('acacia',6,FALSE,'any of various spiny trees or shrubs of the genus Acacia','noun'),
      ('calla',5,FALSE,'water arum','noun'),
      ('calf',1,FALSE,'the muscular back part of the shank','noun'),
      ('acyclic',7,FALSE,'having an open chain structure','adjective'),
      ('cyclically',10,FALSE,NULL,NULL),
      ('ciao',1,FALSE,'an acknowledgment that can be used to say hello or goodbye (aloha is Hawaiian and ciao is Italian)','noun'),
      ('loci',1,FALSE,NULL,NULL),
      ('iliac',5,FALSE,'of or relating to the ilium','adjective'),
      ('foci',1,FALSE,NULL,NULL),
      ('colic',5,FALSE,'acute abdominal pain (especially in infants)','noun'),
      ('coil',1,FALSE,'a structure consisting of something wound in a continuous series of loops','noun'),
      ('cliff',5,FALSE,'a steep high face of rock','noun'),
      ('calico',6,FALSE,'having sections or patches colored differently and usually brightly','adjective'),
      ('loco',1,FALSE,'informal or slang terms for mentally irregular','adjective'),
      ('icily',5,FALSE,'in a cold and icy manner',NULL),
      ('laic',1,FALSE,'characteristic of those who are not members of the clergy','adjective'),
      ('laical',6,FALSE,NULL,NULL),
      ('coyly',5,FALSE,'in a coy manner',NULL),
      ('cola',1,FALSE,'carbonated drink flavored with extract from kola nuts (`dope'' is a southernism in the United States)','noun'),
      ('local',5,FALSE,'anesthetic that numbs a particular area of the body','noun'),
      ('facial',6,FALSE,'cranial nerve that supplies facial muscles','noun'),
      ('official',8,FALSE,'conforming to set usage, procedure, or discipline','adjective'),
      ('locally',7,FALSE,'to a restricted area of the body','adverb'),
      ('cocci',5,FALSE,'any spherical or nearly spherical bacteria','noun'),
      ('cyclic',6,FALSE,'recurring in cycles','adjective'),
      ('coolly',6,FALSE,'in a composed and unconcerned manner','adverb'),
      ('call',1,FALSE,'assign a specified (usually proper) proper name to','verb'),
      ('facially',8,FALSE,'with respect to the face',NULL),
      ('focal',5,FALSE,'having or localized centrally at a focus','adjective'),
      ('coif',1,FALSE,'the arrangement of the hair (especially a woman''s hair)','noun'),
      ('coal',1,FALSE,'burn to charcoal','verb'),
      ('coca',1,FALSE,'a South American shrub whose leaves are chewed by natives of the Andes; a source of cocaine','noun'),
      ('lacy',1,FALSE,'made of or resembling lace','adjective'),
      ('fallacy',7,FALSE,'a misconception resulting from incorrect reasoning','noun'),
      ('clay',1,FALSE,'the dead body of a human being','noun'),
      ('cloy',1,FALSE,'cause surfeit through excess though initially pleasing','verb'),
      ('folic',5,FALSE,NULL,NULL),
      ('lilac',5,FALSE,'of a pale purple color','adjective'),
      ('officially',17,TRUE,'with official authorization','adverb'),
      ('cilia',5,FALSE,NULL,NULL),
      ('cyclical',8,FALSE,'recurring in cycles','adjective')
      RETURNING id
  )
  INSERT INTO puzzle_to_word (puzzle_id,word_id)
  SELECT puzzle_1_id, puzzle_1_word_ids.id FROM puzzle_1_word_ids;
  
  WITH puzzle_2_word_ids AS (
    INSERT INTO word (word,point_value,is_pangram)
    VALUES
      ('allow',5,FALSE),
      ('ammo',1,FALSE),
      ('amok',1,FALSE),
      ('annal',5,FALSE),
      ('anon',4,FALSE)
    RETURNING id
  )
  INSERT INTO puzzle_to_word (puzzle_id,word_id)
  SELECT puzzle_2_id, puzzle_2_word_ids.id FROM puzzle_2_word_ids;

  INSERT INTO guess (is_correct,submitted_by,room_id,word_id,puzzle_id)
  VALUES
    (TRUE,'testUser',(SELECT id FROM room WHERE shortcode='abcdef'),(SELECT id FROM word WHERE word='cool'),puzzle_1_id),
    (TRUE,'testUser',(SELECT id FROM room WHERE shortcode='aaaaaa'),(SELECT id FROM word WHERE word='callaloo'),puzzle_1_id),
    (TRUE,'testUser',(SELECT id FROM room WHERE shortcode='aaaaaa'),(SELECT id FROM word WHERE word='focaccia'),puzzle_1_id),
    (TRUE,'testUser',(SELECT id FROM room WHERE shortcode='abcdef'),(SELECT id FROM word WHERE word='allow'),puzzle_2_id),
    (TRUE,'testUser',(SELECT id FROM room WHERE shortcode='abcdef'),(SELECT id FROM word WHERE word='ammo'),puzzle_2_id),
    (TRUE,'testUser2',(SELECT id FROM room WHERE shortcode='abcdef'),(SELECT id FROM word WHERE word='anon'),puzzle_2_id);

END $$;