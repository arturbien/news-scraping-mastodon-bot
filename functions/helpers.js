const createImagePath = arg => {
  return `${arg.path + arg.name + arg.i}.${arg.extension}`;
};

module.exports = {
  createImagePath
};
