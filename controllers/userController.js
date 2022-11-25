const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
   await User.updateOne({username: req.body.username},{
    $set:{user_status:true}
   })
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });  
     await User.updateOne({username: req.body.username},{
      $set:{user_status:true}
     })
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = async(req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    await User.updateOne({_id: req.params.id},{
      $set:{user_status:false}
     })
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

module.exports.joinuser = async (req, res) => {
  try {
      let body = req.body

      // if (!validation.isrequestBody(body)) {
      //     return res.status(400).send({ status: false, msg: "Invalid parameters, please provide user details" })
      // }

      const { user_reg_no, country, user_phone_number, user_name } = body

      // if (!validation.isValidobjectId(user_reg_no)) {
      //     return res.status(400).send({ status: false, msg: "Doctor id is wrong" })
      // }

      // if (!validation.isValid(country)) {
      //     return res.status(400).send({ status: false, msg: "please provide fullname" })

      // }


    //   if (!validation.isValid(user_phone_number)) {
    //     return res.status(400).send({ status: false, msg: "please provide phone number" })

    // }


      // if (!validation.isValid(user_name)) {
      //     return res.status(400).send({ status: false, msg: "please provide email" })

      // }

      // if (!(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(user_phone_number))) {
      //     return res.status(400).send({ status: false, message: "Mobile Number is not valid" })

      // }

      let duplicatephone = await userModel.findOne({ phone });
      if (duplicatephone) {
          return res.status(400).send({ status: false, messgage: "phone number is already registered" })
      }

      const output = await usertModel.create(body)
      return res.status(201).send({ status: true, msg: "Patient Succesfully Created", data: output })

  }
  catch (error) {
      return res.status(500).send({ status: false, message: error.message });
  }

}
