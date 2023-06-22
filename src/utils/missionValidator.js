const missionValidator = (mission) => {
    const missionRegex = /[a-z\\s]{10,60}/i;
    return missionRegex.test(mission);
  };
  
  export default missionValidator;
  