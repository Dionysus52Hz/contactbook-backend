const CREATE = (req, res) => {
   res.send({
      message: 'Create handler',
   });
};

const FINDALL = (req, res) => {
   res.send({
      message: 'Find all handler',
   });
};

const FINDONE = (req, res) => {
   res.send({
      message: 'Find one handler',
   });
};

const UPDATE = (req, res) => {
   res.send({
      message: 'Update handler',
   });
};

const DELETE = (req, res) => {
   res.send({
      message: 'Delete handler',
   });
};

const DELETEALL = (req, res) => {
   res.send({
      message: 'Delete all handler',
   });
};

const FINDALLFAVORITE = (req, res) => {
   res.send({
      message: 'Find all favorite handler',
   });
};

export const CONTROLLERS = {
   CREATE,
   FINDALL,
   FINDONE,
   UPDATE,
   DELETE,
   DELETEALL,
   FINDALLFAVORITE,
};
