DO $$
DECLARE
  puzzle_id UUID;
BEGIN

  INSERT INTO puzzle (date,outer_letters,center_letter,max_score)
  VALUES 
    ('2022-01-29','{"a","i","y","l","o","f"}','c',224)
  RETURNING id INTO puzzle_id;

  INSERT INTO room (shortcode,name,puzzle_id)
  VALUES 
    ('abcdef','Test Room',puzzle_id);

  INSERT INTO word (word,point_value,is_pangram,definition,part_of_speech,puzzle_id)
  VALUES
    ('callaloo',8,FALSE,NULL,NULL,puzzle_id),
    ('acai',1,FALSE,NULL,NULL,puzzle_id),
    ('focaccia',8,FALSE,NULL,NULL,puzzle_id),
    ('cacao',5,FALSE,'tropical American tree producing cacao beans','noun',puzzle_id),
    ('calcify',7,FALSE,'become impregnated with calcium salts','verb',puzzle_id),
    ('cloaca',6,FALSE,'a waste pipe that carries away sewage or surface water','noun',puzzle_id),
    ('cool',1,FALSE,'great coolness and composure under strain','noun',puzzle_id),
    ('cocoa',5,FALSE,'a beverage made from cocoa powder and milk and sugar; usually drunk hot','noun',puzzle_id),
    ('acacia',6,FALSE,'any of various spiny trees or shrubs of the genus Acacia','noun',puzzle_id),
    ('calla',5,FALSE,'water arum','noun',puzzle_id),
    ('calf',1,FALSE,'the muscular back part of the shank','noun',puzzle_id),
    ('acyclic',7,FALSE,'having an open chain structure','adjective',puzzle_id),
    ('cyclically',10,FALSE,NULL,NULL,puzzle_id),
    ('ciao',1,FALSE,'an acknowledgment that can be used to say hello or goodbye (aloha is Hawaiian and ciao is Italian)','noun',puzzle_id),
    ('loci',1,FALSE,NULL,NULL,puzzle_id),
    ('iliac',5,FALSE,'of or relating to the ilium','adjective',puzzle_id),
    ('foci',1,FALSE,NULL,NULL,puzzle_id),
    ('colic',5,FALSE,'acute abdominal pain (especially in infants)','noun',puzzle_id),
    ('coil',1,FALSE,'a structure consisting of something wound in a continuous series of loops','noun',puzzle_id),
    ('cliff',5,FALSE,'a steep high face of rock','noun',puzzle_id),
    ('calico',6,FALSE,'having sections or patches colored differently and usually brightly','adjective',puzzle_id),
    ('loco',1,FALSE,'informal or slang terms for mentally irregular','adjective',puzzle_id),
    ('icily',5,FALSE,'in a cold and icy manner',NULL,puzzle_id),
    ('laic',1,FALSE,'characteristic of those who are not members of the clergy','adjective',puzzle_id),
    ('laical',6,FALSE,NULL,NULL,puzzle_id),
    ('coyly',5,FALSE,'in a coy manner',NULL,puzzle_id),
    ('cola',1,FALSE,'carbonated drink flavored with extract from kola nuts (`dope'' is a southernism in the United States)','noun',puzzle_id),
    ('local',5,FALSE,'anesthetic that numbs a particular area of the body','noun',puzzle_id),
    ('facial',6,FALSE,'cranial nerve that supplies facial muscles','noun',puzzle_id),
    ('official',8,FALSE,'conforming to set usage, procedure, or discipline','adjective',puzzle_id),
    ('locally',7,FALSE,'to a restricted area of the body','adverb',puzzle_id),
    ('cocci',5,FALSE,'any spherical or nearly spherical bacteria','noun',puzzle_id),
    ('cyclic',6,FALSE,'recurring in cycles','adjective',puzzle_id),
    ('coolly',6,FALSE,'in a composed and unconcerned manner','adverb',puzzle_id),
    ('call',1,FALSE,'assign a specified (usually proper) proper name to','verb',puzzle_id),
    ('facially',8,FALSE,'with respect to the face',NULL,puzzle_id),
    ('focal',5,FALSE,'having or localized centrally at a focus','adjective',puzzle_id),
    ('coif',1,FALSE,'the arrangement of the hair (especially a woman''s hair)','noun',puzzle_id),
    ('coal',1,FALSE,'burn to charcoal','verb',puzzle_id),
    ('coca',1,FALSE,'a South American shrub whose leaves are chewed by natives of the Andes; a source of cocaine','noun',puzzle_id),
    ('lacy',1,FALSE,'made of or resembling lace','adjective',puzzle_id),
    ('fallacy',7,FALSE,'a misconception resulting from incorrect reasoning','noun',puzzle_id),
    ('clay',1,FALSE,'the dead body of a human being','noun',puzzle_id),
    ('cloy',1,FALSE,'cause surfeit through excess though initially pleasing','verb',puzzle_id),
    ('folic',5,FALSE,NULL,NULL,puzzle_id),
    ('lilac',5,FALSE,'of a pale purple color','adjective',puzzle_id),
    ('officially',17,TRUE,'with official authorization','adverb',puzzle_id),
    ('cilia',5,FALSE,NULL,NULL,puzzle_id),
    ('cyclical',8,FALSE,'recurring in cycles','adjective',puzzle_id);

  INSERT INTO guess (is_correct,username,room_id,word_id,puzzle_id)
  VALUES
    (TRUE,'test user',(SELECT id FROM room WHERE shortcode='abcdef'),(SELECT id FROM word WHERE word='cool'),puzzle_id);

END $$;