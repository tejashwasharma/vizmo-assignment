const {
    NOT_FOUND,
    INTERNAL,
    BAD_GATEWAY,
    UNAUTHORIZED,
    FORBIDDEN,
    UNPROCESSABLE_ENTITY,
    BAD_REQUEST,
} = require('./statusCode');

class ApiError {
    constructor(name, message, status) {
        this.isApiError = true; // To know if we have created the error object or not.
        this.name = name;
        this.message = message;
        this.status = status;
    }
}

const getDefaultError = () => new ApiError('UNABLE_TO_PROCESS', 'Unable to process the request.', BAD_REQUEST);
module.exports.getDefaultError = getDefaultError;

// Sends the error (ApiError or generic error) as a response.
// The UNABLE_TO_PROCESS error is used by default if no error is supplied.
const sendErrorResponse = function (res, error = getDefaultError) {
    let errorStatus;
    let errorResponseData;

    if (error.isApiError) {
        const { status, name, message } = error;
        errorStatus = status;
        errorResponseData = {
            error: {
                name,
                message,
            },
        };
    } else {
        errorStatus = BAD_REQUEST;
        errorResponseData = {
            error,
        };
    }

    res.status(errorStatus).json(errorResponseData);
};

const getResourceNotFoundError = (resource = 'resource') => new ApiError('RESOURCE_NOT_FOUND_ERROR', `The requested ${resource} could not be found.`, NOT_FOUND);
module.exports.getResourceNotFoundError = getResourceNotFoundError;
module.exports.getUserNotFoundError = () => getResourceNotFoundError('user');


const getInternalError = () => new ApiError('INTERNAL_ERROR', 'An internal error has occurred.', INTERNAL);
module.exports.getInternalError = getInternalError;

const getAuthenticationError = () => new ApiError('AUTHENTICATION_ERROR', 'You need to be authenticated to perform this request.', UNAUTHORIZED);
module.exports.getAuthenticationError = getAuthenticationError;

const getAuthorizationError = () => new ApiError('AUTHORIZATION_ERROR', 'You need to be authorized to perform this request.', FORBIDDEN);
module.exports.getAuthorizationError = getAuthorizationError;

const getValidationError = (message) => new ApiError('VALIDATION_ERROR', message || 'The request data did not pass the validation.', UNPROCESSABLE_ENTITY);
module.exports.getValidationError = getValidationError;

const getInvalidPasswordError = () => new ApiError('LOGIN_CREDENTIALS_ERROR', 'Invalid password.', FORBIDDEN);
module.exports.getInvalidPasswordError = getInvalidPasswordError;

const getUserAlreadyExistsError = () => new ApiError('USER_ALREADY_EXISTS', 'The email is already in use.', UNPROCESSABLE_ENTITY);
module.exports.getUserAlreadyExistsError = getUserAlreadyExistsError;

const getExternalIssueError = (message = 'A failure occurred in an external resource') => new ApiError('EXTERNAL_ERROR_OCCURRED', message, BAD_GATEWAY);
module.exports.getExternalIssueError = getExternalIssueError;

module.exports.sendResourceNotFoundError = (res, resource) => sendErrorResponse(res, getResourceNotFoundError(resource));

module.exports.sendAuthenticationError = (res) => sendErrorResponse(res, getAuthenticationError());

module.exports.sendAuthorizationError = (res) => sendErrorResponse(res, getAuthorizationError());

module.exports.sendValidationError = (res, message) => sendErrorResponse(res, getValidationError(message));

module.exports.sendErrorResponse = (res, error) => sendErrorResponse(res, error);

module.exports.sendInvalidPasswordError = (res) => sendErrorResponse(res, getInvalidPasswordError());

module.exports.sendUserAlreadyExistsError = (res) => sendErrorResponse(res, getUserAlreadyExistsError());
