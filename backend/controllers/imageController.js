import imagekit from "../config/imageKit.js";

export const getImageKitAuth = (req, res) => {
  const authParams = imagekit.getAuthenticationParameters();
  res.json(authParams);
};
