export function generateRoomCode(length: number) {
  const validLetters = "ACDEFGHJLMNPQRSTUVWXYZ02345679";
  let roomCode = "";
  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * validLetters.length);
    roomCode += validLetters.charAt(random);
  }
  return roomCode;
}

export default generateRoomCode;
