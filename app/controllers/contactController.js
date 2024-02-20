import ApiError from '../apiError.js';
import ContactService from '../services/contactService.js';
import MongoDB from '../utils/mongoDB.js';

const CREATE = async (req, res, next) => {
   if (!req.body?.name) {
      return next(new ApiError(400, 'Name cannot be empty'));
   }
   try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.create(req.body);
      console.log(document);
      return res.send(document);
   } catch (error) {
      console.log(error);
      return next(
         new ApiError(500, 'An error occurred while creating the contact')
      );
   }
};

const FINDALL = async (req, res, next) => {
   let documents = [];

   try {
      const contactService = new ContactService(MongoDB.client);
      const { name } = req.query;
      if (name) {
         documents = await contactService.findByName(name);
      } else {
         documents = await contactService.find({});
      }
   } catch (error) {
      return next(
         new ApiError(500, 'An error occurred while retrieving contacts.')
      );
   }

   return res.send(documents);
};

const FINDONE = async (req, res, next) => {
   try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.findById(req.params.id);

      if (!document) {
         return next(new ApiError(404, 'Contact not found'));
      }

      return res.send(document);
   } catch (error) {
      return next(
         new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
      );
   }
};

const UPDATE = async (req, res, next) => {
   if (Object.keys(req.body).length === 0) {
      return next(new ApiError(400, 'Data to update can not be empty.'));
   }

   try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.update(req.params.id, req.body);

      if (!document) {
         return next(new ApiError(404, 'Contact not found'));
      }

      return res.send({
         message: 'Contact was updated successfully.',
      });
   } catch (error) {
      return next(
         new ApiError(500, `Error updating contact with id=${req.params.id}`)
      );
   }
};

const DELETE = async (req, res, next) => {
   try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.delete(req.params.id);

      if (!document) {
         return next(new ApiError(404, 'Contact not found.'));
      }

      return res.send({
         message: 'Contact was deleted successfully.',
      });
   } catch (error) {
      return next(
         new ApiError(500, `Could not delete contact with id=${req.params.id}`)
      );
   }
};

const DELETEALL = async (req, res, next) => {
   try {
      const contactService = new ContactService(MongoDB.client);
      const numOfDocumentsDeleted = await contactService.deleteAll();

      return res.send({
         message: `${numOfDocumentsDeleted} contacts were deleted successfully.`,
      });
   } catch (error) {
      return next(
         new ApiError(500, 'An error occurred while removing all contacts.')
      );
   }
};

const FINDALLFAVORITE = async (req, res, next) => {
   try {
      const contactService = new ContactService(MongoDB.client);
      const documents = await contactService.findFavorite();

      return res.send(documents);
   } catch (error) {
      return next(
         new ApiError(
            500,
            'An error occurred while retrieving favorite contacts.'
         )
      );
   }
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
