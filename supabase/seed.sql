DO $$
DECLARE
  puzzle_id_1 UUID;
  puzzle_id_2 UUID;
BEGIN

  INSERT INTO puzzle (date,outer_letters,center_letter,max_score)
  VALUES 
    ('2022-01-29','{"a","i","y","l","o","f"}','c',224)
  RETURNING id INTO puzzle_id_1;

  INSERT INTO puzzle (date,outer_letters,center_letter,max_score)
  VALUES 
    ('2022-07-30','{"k","o","m","l","n","w"}','a',119)
  RETURNING id INTO puzzle_id_2;

  INSERT INTO room (shortcode)
  VALUES 
    ('abcdef'), 
    ('aaaaaa');

  INSERT INTO word (word,point_value,is_pangram,definition,part_of_speech,puzzle_id)
  VALUES
    ('callaloo',8,FALSE,NULL,NULL,puzzle_id_1),
    ('acai',1,FALSE,NULL,NULL,puzzle_id_1),
    ('focaccia',8,FALSE,NULL,NULL,puzzle_id_1),
    ('cacao',5,FALSE,'tropical American tree producing cacao beans','noun',puzzle_id_1),
    ('calcify',7,FALSE,'become impregnated with calcium salts','verb',puzzle_id_1),
    ('cloaca',6,FALSE,'a waste pipe that carries away sewage or surface water','noun',puzzle_id_1),
    ('cool',1,FALSE,'great coolness and composure under strain','noun',puzzle_id_1),
    ('cocoa',5,FALSE,'a beverage made from cocoa powder and milk and sugar; usually drunk hot','noun',puzzle_id_1),
    ('acacia',6,FALSE,'any of various spiny trees or shrubs of the genus Acacia','noun',puzzle_id_1),
    ('calla',5,FALSE,'water arum','noun',puzzle_id_1),
    ('calf',1,FALSE,'the muscular back part of the shank','noun',puzzle_id_1),
    ('acyclic',7,FALSE,'having an open chain structure','adjective',puzzle_id_1),
    ('cyclically',10,FALSE,NULL,NULL,puzzle_id_1),
    ('ciao',1,FALSE,'an acknowledgment that can be used to say hello or goodbye (aloha is Hawaiian and ciao is Italian)','noun',puzzle_id_1),
    ('loci',1,FALSE,NULL,NULL,puzzle_id_1),
    ('iliac',5,FALSE,'of or relating to the ilium','adjective',puzzle_id_1),
    ('foci',1,FALSE,NULL,NULL,puzzle_id_1),
    ('colic',5,FALSE,'acute abdominal pain (especially in infants)','noun',puzzle_id_1),
    ('coil',1,FALSE,'a structure consisting of something wound in a continuous series of loops','noun',puzzle_id_1),
    ('cliff',5,FALSE,'a steep high face of rock','noun',puzzle_id_1),
    ('calico',6,FALSE,'having sections or patches colored differently and usually brightly','adjective',puzzle_id_1),
    ('loco',1,FALSE,'informal or slang terms for mentally irregular','adjective',puzzle_id_1),
    ('icily',5,FALSE,'in a cold and icy manner',NULL,puzzle_id_1),
    ('laic',1,FALSE,'characteristic of those who are not members of the clergy','adjective',puzzle_id_1),
    ('laical',6,FALSE,NULL,NULL,puzzle_id_1),
    ('coyly',5,FALSE,'in a coy manner',NULL,puzzle_id_1),
    ('cola',1,FALSE,'carbonated drink flavored with extract from kola nuts (`dope'' is a southernism in the United States)','noun',puzzle_id_1),
    ('local',5,FALSE,'anesthetic that numbs a particular area of the body','noun',puzzle_id_1),
    ('facial',6,FALSE,'cranial nerve that supplies facial muscles','noun',puzzle_id_1),
    ('official',8,FALSE,'conforming to set usage, procedure, or discipline','adjective',puzzle_id_1),
    ('locally',7,FALSE,'to a restricted area of the body','adverb',puzzle_id_1),
    ('cocci',5,FALSE,'any spherical or nearly spherical bacteria','noun',puzzle_id_1),
    ('cyclic',6,FALSE,'recurring in cycles','adjective',puzzle_id_1),
    ('coolly',6,FALSE,'in a composed and unconcerned manner','adverb',puzzle_id_1),
    ('call',1,FALSE,'assign a specified (usually proper) proper name to','verb',puzzle_id_1),
    ('facially',8,FALSE,'with respect to the face',NULL,puzzle_id_1),
    ('focal',5,FALSE,'having or localized centrally at a focus','adjective',puzzle_id_1),
    ('coif',1,FALSE,'the arrangement of the hair (especially a woman''s hair)','noun',puzzle_id_1),
    ('coal',1,FALSE,'burn to charcoal','verb',puzzle_id_1),
    ('coca',1,FALSE,'a South American shrub whose leaves are chewed by natives of the Andes; a source of cocaine','noun',puzzle_id_1),
    ('lacy',1,FALSE,'made of or resembling lace','adjective',puzzle_id_1),
    ('fallacy',7,FALSE,'a misconception resulting from incorrect reasoning','noun',puzzle_id_1),
    ('clay',1,FALSE,'the dead body of a human being','noun',puzzle_id_1),
    ('cloy',1,FALSE,'cause surfeit through excess though initially pleasing','verb',puzzle_id_1),
    ('folic',5,FALSE,NULL,NULL,puzzle_id_1),
    ('lilac',5,FALSE,'of a pale purple color','adjective',puzzle_id_1),
    ('officially',17,TRUE,'with official authorization','adverb',puzzle_id_1),
    ('cilia',5,FALSE,NULL,NULL,puzzle_id_1),
    ('cyclical',8,FALSE,'recurring in cycles','adjective',puzzle_id_1);

  INSERT INTO word (word,point_value,is_pangram,puzzle_id)
  VALUES
    ('allow',5,FALSE,puzzle_id_2),
    ('ammo',1,FALSE,puzzle_id_2),
    ('amok',1,FALSE,puzzle_id_2),
    ('anal',1,FALSE,puzzle_id_2),
    ('annal',5,FALSE,puzzle_id_2),
    ('anon',4,FALSE,puzzle_id_2);

  INSERT INTO guess (is_correct,username,room_id,word_id,puzzle_id)
  VALUES
    (TRUE,'testUser',(SELECT id FROM room WHERE shortcode='abcdef'),(SELECT id FROM word WHERE word='cool'),puzzle_id_1),
    (TRUE,'testUser',(SELECT id FROM room WHERE shortcode='aaaaaa'),(SELECT id FROM word WHERE word='callaloo'),puzzle_id_1),
    (TRUE,'testUser',(SELECT id FROM room WHERE shortcode='aaaaaa'),(SELECT id FROM word WHERE word='focaccia'),puzzle_id_1),
    (TRUE,'testUser',(SELECT id FROM room WHERE shortcode='abcdef'),(SELECT id FROM word WHERE word='allow'),puzzle_id_2);

END $$;