const bcrypt = require('bcrypt');


const hashPassword = async (pw) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(pw, salt);
  console.log(salt);
  console.log(hash);
};

const login = async (pw, hashedPw) => {
  const result = await bcrypt.compare(pw, hashedPw);
  if(result) {
    console.log('logged you in! successful match!')
  } else {
    console.log('incorrect!')
  }
}

login('monkey', '$2b$12$K5Zs/Ows.bE4sk96a1LmLOz8QmDriBne7JQjOAjbaiwnHeMjWBC0q')

// hashPassword('monkey');

